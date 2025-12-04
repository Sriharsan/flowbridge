import { ActivityEvent, Task } from "./types";

/**
 * Very simple "workflow automation" layer.
 * In a real system this could be rule-based or user-configured.
 */

export function applyAutomationRules(task: Task): {
  task: Task;
  events: ActivityEvent[];
} {
  const now = new Date().toISOString();
  const events: ActivityEvent[] = [];

  let updatedTask = { ...task };

  // Example rule: critical tasks in backlog are automatically moved to in_progress.
  if (updatedTask.priority === "critical" && updatedTask.status === "backlog") {
    updatedTask = { ...updatedTask, status: "in_progress", updatedAt: now };
    events.push({
      id: `${updatedTask.id}-auto-progress`,
      type: "task_updated",
      message: `Automation: Critical task "${updatedTask.title}" moved to In Progress.`,
      createdAt: now
    });
  }

  // Example rule: tasks past due date are marked as blocked unless already done.
  if (
    updatedTask.dueDate &&
    updatedTask.status !== "done" &&
    new Date(updatedTask.dueDate).getTime() < Date.now()
  ) {
    if (updatedTask.status !== "blocked") {
      updatedTask = { ...updatedTask, status: "blocked", updatedAt: now };
      events.push({
        id: `${updatedTask.id}-auto-block`,
        type: "task_updated",
        message: `Automation: Task "${updatedTask.title}" marked as Blocked (past due date).`,
        createdAt: now
      });
    }
  }

  return { task: updatedTask, events };
}


