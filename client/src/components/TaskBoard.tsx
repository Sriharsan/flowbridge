import type { Task } from "../api";

interface Props {
  tasks: Task[];
  onAdvanceTask: (task: Task) => void;
}

const STATUS_COLUMNS: { key: Task["status"]; label: string }[] = [
  { key: "backlog", label: "Backlog" },
  { key: "in_progress", label: "In Progress" },
  { key: "blocked", label: "Blocked" },
  { key: "done", label: "Done" }
];

const priorityClass = (priority: Task["priority"]) => {
  switch (priority) {
    case "critical":
      return "pill pill-critical";
    case "high":
      return "pill pill-high";
    case "medium":
      return "pill pill-medium";
    default:
      return "pill pill-low";
  }
};

const TaskBoard = ({ tasks, onAdvanceTask }: Props) => {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Task Board</h2>
          <p className="card-subtitle">
            Track work across the lifecycle in real time &mdash; click a card to advance it.
          </p>
        </div>
        <div className="card-header-actions">
          <button className="btn btn-ghost">Automation rules</button>
          <button className="btn btn-ghost">Filters</button>
        </div>
      </div>
      <div className="taskboard-grid">
        {STATUS_COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.key);
          return (
            <div key={column.key} className="task-column">
              <div className="task-column-header">
                <span>{column.label}</span>
                <span className="task-column-count">{columnTasks.length}</span>
              </div>
              <div className="task-column-body">
                {columnTasks.map((task) => (
                  <article
                    key={task.id}
                    className="task-card"
                    onClick={() => onAdvanceTask(task)}
                    title="Click to move this task to the next stage"
                  >
                    <div className="task-card-title-row">
                      <h3 className="task-card-title">{task.title}</h3>
                      <span className={priorityClass(task.priority)}>{task.priority}</span>
                    </div>
                    {task.description && (
                      <p className="task-card-description">{task.description}</p>
                    )}
                    <div className="task-card-meta">
                      {task.dueDate && (
                        <span className="task-card-meta-item">
                          Due {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      <span className="task-card-meta-item">
                        Updated {new Date(task.updatedAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </article>
                ))}
                {columnTasks.length === 0 && (
                  <div className="task-column-empty">No tasks in this column yet.</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TaskBoard;


