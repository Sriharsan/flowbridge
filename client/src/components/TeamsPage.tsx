import { useEffect, useState } from "react";
import { fetchProjects, fetchTasks, fetchTeams, Project, Task, Team, User } from "../api";

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTeams()
      .then((data) => {
        setTeams(data.teams);
        setUsers(data.users);
      })
      .catch(console.error);
    fetchProjects().then(setProjects).catch(console.error);
    fetchTasks().then(setTasks).catch(console.error);
  }, []);

  return (
    <div className="placeholder-page">
      <h2>Teams</h2>
      <p className="placeholder-copy">
        View squads, who belongs to them, and how much work each team is carrying right now.
      </p>
      <div className="team-grid">
        {teams.map((team) => {
          const teamProjects = projects.filter((p) => p.teamId === team.id);
          const teamTasks = tasks.filter((t) => t.teamId === team.id);
          const inProgress = teamTasks.filter((t) => t.status === "in_progress").length;
          const blocked = teamTasks.filter((t) => t.status === "blocked").length;
          const done = teamTasks.filter((t) => t.status === "done").length;
          return (
            <article key={team.id} className="team-card">
              <h3 className="team-name">{team.name}</h3>
              <p className="team-meta">
                {team.members.length} members · {team.members.map((m) => m.name).join(", ")}
              </p>
              <p className="team-meta">
                {teamProjects.length} projects · {teamTasks.length} tasks ({inProgress} in progress,{" "}
                {blocked} blocked, {done} done)
              </p>
            </article>
          );
        })}
      </div>
      <h3 className="section-heading">All People</h3>
      <div className="people-row">
        {users.map((user) => (
          <span key={user.id} className="pill pill-low">
            {user.name} · {user.role}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;


