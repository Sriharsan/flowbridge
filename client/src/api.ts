const API_BASE = "http://localhost:4000/api";

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  teamId?: string;
  assigneeId?: string;
  status: "backlog" | "in_progress" | "blocked" | "done";
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  teamId?: string;
  status: "active" | "paused" | "completed";
  createdAt: string;
  metrics?: {
    totalTasks: number;
    done: number;
    inProgress: number;
    completion: number;
  };
}

export interface ActivityEvent {
  id: string;
  type: "task_created" | "task_updated" | "project_updated";
  message: string;
  createdAt: string;
}

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

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json();
}

export async function fetchTasks(projectId?: string): Promise<Task[]> {
  const url = projectId ? `${API_BASE}/tasks?projectId=${projectId}` : `${API_BASE}/tasks`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load tasks");
  return res.json();
}

export async function createTask(input: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id: string, input: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function createProject(input: { name: string; description: string }): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function fetchTeams(): Promise<{ teams: Team[]; users: User[] }> {
  const res = await fetch(`${API_BASE}/teams`);
  if (!res.ok) throw new Error("Failed to load teams");
  return res.json();
}

export async function fetchActivity(): Promise<ActivityEvent[]> {
  const res = await fetch(`${API_BASE}/activity`);
  if (!res.ok) throw new Error("Failed to load activity");
  return res.json();
}


