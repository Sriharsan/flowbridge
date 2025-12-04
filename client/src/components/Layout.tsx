import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";
import type { ReactNode } from "react";
import type { View } from "../App";
import ProjectsPage from "./ProjectsPage";
import TeamsPage from "./TeamsPage";
import AutomationsPage from "./AutomationsPage";
import ReportsPage from "./ReportsPage";
import ActivityPage from "./ActivityPage";

interface LayoutProps {
  currentView: View;
  onChangeView: (view: View) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  theme: "dark" | "light" | "hybrid";
  onThemeChange: (value: "dark" | "light" | "hybrid") => void;
}

const Layout = ({
  currentView,
  onChangeView,
  searchQuery,
  onSearchChange,
  theme,
  onThemeChange
}: LayoutProps) => {
  let content: ReactNode;

  if (currentView === "dashboard") {
    content = <Dashboard searchQuery={searchQuery} />;
  } else if (currentView === "projects") {
    content = <ProjectsPage searchQuery={searchQuery} />;
  } else if (currentView === "teams") {
    content = <TeamsPage />;
  } else if (currentView === "automations") {
    content = <AutomationsPage />;
  } else if (currentView === "reports") {
    content = <ReportsPage />;
  } else {
    content = <ActivityPage />;
  }

  const scrollToForm = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const input = el.querySelector("input");
      if (input instanceof HTMLInputElement) {
        input.focus();
      }
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        currentView={currentView}
        onChangeView={onChangeView}
        theme={theme}
        onThemeChange={onThemeChange}
      />
      <div className="app-main">
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onNewProjectClick={() => scrollToForm("project-create-form")}
          onNewTaskClick={() => scrollToForm("task-create-form")}
        />
        <main className="app-content">{content}</main>
      </div>
    </div>
  );
};

export default Layout;



