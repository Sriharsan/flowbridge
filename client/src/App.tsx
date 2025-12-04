import { useEffect, useState } from "react";
import Layout from "./components/Layout";

export type View =
  | "dashboard"
  | "projects"
  | "teams"
  | "automations"
  | "reports"
  | "activity";

const App = () => {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light" | "hybrid">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <Layout
      currentView={currentView}
      onChangeView={setCurrentView}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      theme={theme}
      onThemeChange={setTheme}
    />
  );
};

export default App;



