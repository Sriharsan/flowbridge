import type { Project } from "../api";

interface Props {
  projects: Project[];
}

const ProjectSummary = ({ projects }: Props) => {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article key={project.id} className="project-card">
          <div className="project-card-header">
            <h3 className="project-card-title">{project.name}</h3>
            <span className={`pill pill-status-${project.status}`}>{project.status}</span>
          </div>
          <p className="project-card-description">{project.description}</p>
          {project.metrics && (
            <div className="project-card-metrics">
              <div>
                <div className="metric-label">Completion</div>
                <div className="metric-value">{project.metrics.completion}%</div>
                <div className="metric-bar">
                  <div
                    className="metric-bar-fill"
                    style={{ width: `${project.metrics.completion}%` }}
                  />
                </div>
              </div>
              <div className="metric-inline">
                <span>{project.metrics.totalTasks} tasks</span>
                <span>{project.metrics.inProgress} in progress</span>
                <span>{project.metrics.done} done</span>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

export default ProjectSummary;


