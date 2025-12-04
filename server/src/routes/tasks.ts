import { Router } from "express";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { db } from "../dataStore";
import { applyAutomationRules } from "../workflowEngine";
import { Task } from "../types";
import type { Server } from "socket.io";

const router = Router();

let io: Server | null = null;

export function attachTaskSocket(serverIo: Server) {
  io = serverIo;
}

router.get("/", (req, res) => {
  const { projectId } = req.query;
  let tasks = db.tasks;

  if (projectId && typeof projectId === "string") {
    tasks = tasks.filter((t) => t.projectId === projectId);
  }

  res.json(tasks);
});

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().default(""),
  projectId: z.string(),
  teamId: z.string().optional(),
  assigneeId: z.string().optional(),
  status: z
    .enum(["backlog", "in_progress", "blocked", "done"])
    .optional()
    .default("backlog"),
  priority: z
    .enum(["low", "medium", "high", "critical"])
    .optional()
    .default("medium"),
  dueDate: z.string().optional()
});

router.post("/", (req, res) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const now = new Date().toISOString();

  // Derive teamId if not explicitly provided
  let teamId = parsed.data.teamId;
  if (!teamId && parsed.data.assigneeId) {
    const team = db.teams.find((t) =>
      t.members.some((m) => m.id === parsed.data.assigneeId)
    );
    if (team) {
      teamId = team.id;
    }
  }
  if (!teamId) {
    const project = db.projects.find((p) => p.id === parsed.data.projectId);
    if (project?.teamId) {
      teamId = project.teamId;
    }
  }

  const baseTask: Task = {
    id: uuid(),
    title: parsed.data.title,
    description: parsed.data.description,
    projectId: parsed.data.projectId,
    teamId,
    assigneeId: parsed.data.assigneeId,
    status: parsed.data.status,
    priority: parsed.data.priority,
    dueDate: parsed.data.dueDate,
    createdAt: now,
    updatedAt: now
  };

  const { task, events } = applyAutomationRules(baseTask);
  db.tasks.push(task);
  db.activityEvents.push(
    {
      id: uuid(),
      type: "task_created",
      message: `Task "${task.title}" created.`,
      createdAt: now
    },
    ...events
  );

  if (io) {
    io.emit("task:created", task);
    events.forEach((e) => io!.emit("activity:event", e));
  }

  res.status(201).json(task);
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  assigneeId: z.string().optional().nullable(),
  teamId: z.string().optional().nullable(),
  status: z.enum(["backlog", "in_progress", "blocked", "done"]).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  dueDate: z.string().optional().nullable()
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const existingIndex = db.tasks.findIndex((t) => t.id === id);
  if (existingIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const now = new Date().toISOString();
  const original = db.tasks[existingIndex];
  const updatedBase: Task = {
    ...original,
    ...parsed.data,
    updatedAt: now
  };

  const { task, events } = applyAutomationRules(updatedBase);
  db.tasks[existingIndex] = task;

  db.activityEvents.push(
    {
      id: uuid(),
      type: "task_updated",
      message: `Task "${task.title}" updated.`,
      createdAt: now
    },
    ...events
  );

  if (io) {
    io.emit("task:updated", task);
    events.forEach((e) => io!.emit("activity:event", e));
  }

  res.json(task);
});

export default router;


