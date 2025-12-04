import { Router } from "express";
import { db } from "../dataStore";
import { v4 as uuid } from "uuid";
import { z } from "zod";

const router = Router();

router.get("/", (req, res) => {
  const projects = db.projects.map((project) => {
    const projectTasks = db.tasks.filter((t) => t.projectId === project.id);
    const total = projectTasks.length;
    const done = projectTasks.filter((t) => t.status === "done").length;
    const inProgress = projectTasks.filter((t) => t.status === "in_progress").length;

    return {
      ...project,
      metrics: {
        totalTasks: total,
        done,
        inProgress,
        completion: total === 0 ? 0 : Math.round((done / total) * 100)
      }
    };
  });

  res.json(projects);
});

const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().default(""),
  teamId: z.string().optional()
});

router.post("/", (req, res) => {
  const parsed = createProjectSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const now = new Date().toISOString();
  const ownerId = db.users[0]?.id ?? uuid();

  const project = {
    id: uuid(),
    name: parsed.data.name,
    description: parsed.data.description,
    ownerId,
    teamId: parsed.data.teamId,
    status: "active" as const,
    createdAt: now
  };

  db.projects.push(project);
  db.activityEvents.push({
    id: uuid(),
    type: "project_updated",
    message: `Project "${project.name}" created.`,
    createdAt: now
  });

  res.status(201).json(project);
});

export default router;


