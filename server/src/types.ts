export type TaskStatus = "backlog" | "in_progress" | "blocked" | "done";

export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface User {
  id: string;
  name: string;
  role: "manager" | "developer" | "designer" | "qa" | "ops";
}

export interface Team {
  id: string;
  name: string;
  members: User[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  teamId?: string;
  status: "active" | "paused" | "completed";
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  teamId?: string;
  assigneeId?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityEvent {
  id: string;
  type: "task_created" | "task_updated" | "project_updated";
  message: string;
  createdAt: string;
}


