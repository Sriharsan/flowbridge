import { v4 as uuid } from "uuid";
import { ActivityEvent, Project, Task, Team, User } from "./types";

// In-memory data store for demo purposes.

const users: User[] = [
  { id: uuid(), name: "Alex Rivera", role: "manager" },
  { id: uuid(), name: "Jordan Lee", role: "developer" },
  { id: uuid(), name: "Taylor Kim", role: "designer" },
  { id: uuid(), name: "Priya Patel", role: "qa" },
  { id: uuid(), name: "Sam Chen", role: "ops" }
];

const teams: Team[] = [
  {
    id: uuid(),
    name: "Core Platform",
    members: [users[0], users[1], users[2]]
  },
  {
    id: uuid(),
    name: "Growth Experiments",
    members: [users[3], users[4]]
  }
];

const projects: Project[] = [
  {
    id: uuid(),
    name: "FlowBridge Launch",
    description: "Initial launch of the FlowBridge workflow automation platform.",
    ownerId: users[0].id,
    teamId: teams[0].id,
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    name: "Onboarding Revamp",
    description: "Improve first-time user onboarding flows and guided tours.",
    ownerId: users[0].id,
    teamId: teams[1].id,
    status: "active",
    createdAt: new Date().toISOString()
  }
];

const tasks: Task[] = [
  {
    id: uuid(),
    title: "Design dashboard layout",
    description: "Create responsive UI for the FlowBridge main dashboard.",
    projectId: projects[0].id,
    teamId: teams[0].id,
    assigneeId: users[2].id,
    status: "in_progress",
    priority: "high",
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: "Implement task board API",
    description: "Expose CRUD endpoints for tasks and projects.",
    projectId: projects[0].id,
    teamId: teams[0].id,
    assigneeId: users[1].id,
    status: "backlog",
    priority: "critical",
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: "Set up automation rules engine",
    description: "Auto-update task priority and status based on activity.",
    projectId: projects[0].id,
    teamId: teams[0].id,
    assigneeId: users[1].id,
    status: "backlog",
    priority: "high",
    dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: "Craft onboarding checklist",
    description: "Define the steps new teams must complete on first login.",
    projectId: projects[1].id,
    teamId: teams[1].id,
    assigneeId: users[3].id,
    status: "in_progress",
    priority: "medium",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const activityEvents: ActivityEvent[] = [];

export const db = {
  users,
  teams,
  projects,
  tasks,
  activityEvents
};


