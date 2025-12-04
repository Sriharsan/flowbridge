interface TopbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewProjectClick: () => void;
  onNewTaskClick: () => void;
}

const Topbar = ({
  searchQuery,
  onSearchChange,
  onNewProjectClick,
  onNewTaskClick
}: TopbarProps) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">Unified Ops Workspace</h1>
        <span className="topbar-subtitle">Real-time view of projects, workflows, and teams</span>
      </div>
      <div className="topbar-right">
        <div className="topbar-search">
          <input
            placeholder="Search tasks, projects, people..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button className="btn btn-ghost" type="button" onClick={onNewProjectClick}>
          + New Project
        </button>
        <button className="btn btn-primary" type="button" onClick={onNewTaskClick}>
          + New Task
        </button>
      </div>
    </header>
  );
};

export default Topbar;


