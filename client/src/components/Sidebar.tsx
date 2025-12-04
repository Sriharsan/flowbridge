interface SidebarProps {
  currentView:
    | "dashboard"
    | "projects"
    | "teams"
    | "automations"
    | "reports"
    | "activity";
  onChangeView: (view: SidebarProps["currentView"]) => void;
  theme: "dark" | "light" | "hybrid";
  onThemeChange: (value: "dark" | "light" | "hybrid") => void;
}

const Sidebar = ({ currentView, onChangeView, theme, onThemeChange }: SidebarProps) => {
  const itemClass = (view: SidebarProps["currentView"]) =>
    `sidebar-item${currentView === view ? " sidebar-item-active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-dot" />
        <span className="logo-text">FlowBridge</span>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Workspace</div>
        <button className={itemClass("dashboard")} onClick={() => onChangeView("dashboard")}>
          Dashboard
        </button>
        <button className={itemClass("projects")} onClick={() => onChangeView("projects")}>
          Projects
        </button>
        <button className={itemClass("teams")} onClick={() => onChangeView("teams")}>
          Teams
        </button>
        <button className={itemClass("automations")} onClick={() => onChangeView("automations")}>
          Automations
        </button>

        <div className="sidebar-section-title">Insights</div>
        <button className={itemClass("reports")} onClick={() => onChangeView("reports")}>
          Reports
        </button>
        <button className={itemClass("activity")} onClick={() => onChangeView("activity")}>
          Activity
        </button>
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="avatar-circle">SR</div>
          <div>
            <div className="sidebar-user-name">Sriharsan</div>
            <div className="sidebar-user-role">Workspace Admin</div>
          </div>
        </div>
        <div className="theme-toggle">
          <button
            type="button"
            className={`theme-chip${theme === "dark" ? " theme-chip-active" : ""}`}
            onClick={() => onThemeChange("dark")}
          >
            Dark
          </button>
          <button
            type="button"
            className={`theme-chip${theme === "light" ? " theme-chip-active" : ""}`}
            onClick={() => onThemeChange("light")}
          >
            Light
          </button>
          <button
            type="button"
            className={`theme-chip${theme === "hybrid" ? " theme-chip-active" : ""}`}
            onClick={() => onThemeChange("hybrid")}
          >
            Hybrid
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;


