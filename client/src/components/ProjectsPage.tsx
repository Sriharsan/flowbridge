import { useEffect, useMemo, useState } from "react";
import { fetchProjects, Project } from "../api";
import ProjectSummary from "./ProjectSummary";

interface Props {
  searchQuery: string;
}

const ProjectsPage = ({ searchQuery }: Props) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [projects, searchQuery]);

  return (
    <div className="placeholder-page">
      <h2>Projects</h2>
      <p className="placeholder-copy">
        Browse every initiative in your workspace, including completion and throughput.
      </p>
      <ProjectSummary projects={filtered} />
    </div>
  );
};

export default ProjectsPage;


