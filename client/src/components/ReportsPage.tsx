import { useEffect, useState } from "react";
import { fetchProjects, fetchTasks, Project, Task } from "../api";

const ReportsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(console.error);
    fetchTasks().then(setTasks).catch(console.error);
  }, []);

  const totalTasks = tasks.length;
  const statusCounts = {
    backlog: tasks.filter((t) => t.status === "backlog").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    blocked: tasks.filter((t) => t.status === "blocked").length,
    done: tasks.filter((t) => t.status === "done").length
  };

  return (
    <div className="placeholder-page">
      <h2>Reports</h2>
      <p className="placeholder-copy">
        Lightweight analytics over your current FlowBridge workspace, powered directly from the
        backend data store.
      </p>

      <section className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Task Status Breakdown</h3>
            <p className="card-subtitle">How work is distributed across the lifecycle.</p>
          </div>
        </div>
        <div className="metric-inline">
          <span>Total: {totalTasks}</span>
          <span>Backlog: {statusCounts.backlog}</span>
          <span>In Progress: {statusCounts.in_progress}</span>
          <span>Blocked: {statusCounts.blocked}</span>
          <span>Done: {statusCounts.done}</span>
        </div>
      </section>

      <section className="card" style={{ marginTop: 12 }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">Data Explorer</h3>
            <p className="card-subtitle">
              Raw view of the current &quot;database&quot; &mdash; projects and their tasks.
            </p>
          </div>
        </div>
        <div className="report-table">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Task</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const project = projects.find((p) => p.id === task.projectId);
                return (
                  <tr key={task.id}>
                    <td>{project ? project.name : "Unknown"}</td>
                    <td>{task.title}</td>
                    <td>{task.status}</td>
                    <td>{task.priority}</td>
                    <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;


