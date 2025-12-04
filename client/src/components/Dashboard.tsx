import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ActivityEvent,
  createProject,
  createTask,
  fetchProjects,
  fetchTasks,
  fetchTeams,
  Project,
  Task,
  Team,
  User,
  updateTask
} from "../api";
import { getSocket } from "../socket";
import TaskBoard from "./TaskBoard";
import ProjectSummary from "./ProjectSummary";
import ActivityFeed from "./ActivityFeed";

interface DashboardProps {
  searchQuery: string;
}

const Dashboard = ({ searchQuery }: DashboardProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [creatingTask, setCreatingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskProjectId, setNewTaskProjectId] = useState<string | undefined>();
  const [newTaskTeamId, setNewTaskTeamId] = useState<string | undefined>();
  const [newTaskAssigneeId, setNewTaskAssigneeId] = useState<string | undefined>();
  const [newTaskPriority, setNewTaskPriority] = useState<Task["priority"]>("medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [creatingProject, setCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectTeamId, setNewProjectTeamId] = useState<string | undefined>();

  const advanceStatus = (status: Task["status"]): Task["status"] => {
    const order: Task["status"][] = ["backlog", "in_progress", "blocked", "done"];
    const currentIndex = order.indexOf(status);
    if (currentIndex === -1 || currentIndex === order.length - 1) {
      return status;
    }
    return order[currentIndex + 1];
  };

  const handleAdvanceTask = async (task: Task) => {
    const nextStatus = advanceStatus(task.status);
    if (nextStatus === task.status) return;

    // Optimistic UI update
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t)));

    try {
      await updateTask(task.id, { status: nextStatus });
    } catch (err) {
      console.error(err);
      // Revert if API fails
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    }
  };

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !newTaskProjectId) return;

    setCreatingTask(true);
    try {
      await createTask({
        title: newTaskTitle.trim(),
        description: "",
        projectId: newTaskProjectId,
        teamId: newTaskTeamId,
        assigneeId: newTaskAssigneeId,
        priority: newTaskPriority,
        status: "backlog",
        dueDate: newTaskDueDate || undefined
      });
      setNewTaskTitle("");
      setNewTaskDueDate("");
      setNewTaskAssigneeId(undefined);
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingTask(false);
    }
  };

  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    setCreatingProject(true);
    try {
      const project = await createProject({
        name: newProjectName.trim(),
        description: newProjectDescription.trim(),
        teamId: newProjectTeamId
      });
      setProjects((prev) => [...prev, project]);
      setNewProjectName("");
      setNewProjectDescription("");
      setNewProjectTeamId(undefined);
      if (!newTaskProjectId) {
        setNewTaskProjectId(project.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingProject(false);
    }
  };

  useEffect(() => {
    // Initial HTTP load
    fetchProjects()
      .then((p) => {
        setProjects(p);
        if (p.length > 0) {
          setNewTaskProjectId(p[0].id);
        }
      })
      .catch(console.error);
    fetchTasks().then(setTasks).catch(console.error);
    fetchTeams()
      .then((data) => {
        setTeams(data.teams);
        setUsers(data.users);
        if (!newProjectTeamId && data.teams.length > 0) {
          setNewProjectTeamId(data.teams[0].id);
        }
      })
      .catch(console.error);

    const socket = getSocket();

    socket.on("bootstrap", (payload) => {
      setTasks(payload.tasks);
      setProjects(payload.projects);
      setEvents(payload.activityEvents);
    });

    socket.on("task:created", (task: Task) => {
      setTasks((prev) => [...prev, task]);
    });

    socket.on("task:updated", (task: Task) => {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    });

    socket.on("activity:event", (event: ActivityEvent) => {
      setEvents((prev) => [...prev, event]);
    });

    return () => {
      socket.off("bootstrap");
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("activity:event");
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [projects, searchQuery]);

  const filteredTasks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, searchQuery]);

  const taskAssigneeOptions = useMemo(() => {
    if (!newTaskTeamId) return [];
    const team = teams.find((t) => t.id === newTaskTeamId);
    if (!team) return [];
    return team.members;
  }, [teams, newTaskTeamId]);

  return (
    <div className="dashboard-grid">
      <div className="dashboard-main">
        <section className="card">
          <div className="card-header card-header-row" id="project-create-form">
            <div>
              <h2 className="card-title">Project Overview</h2>
              <p className="card-subtitle">Health and throughput across active initiatives</p>
            </div>
            <form className="inline-form" onSubmit={handleCreateProject}>
              <select
                className="inline-select"
                value={newProjectTeamId}
                onChange={(e) => setNewProjectTeamId(e.target.value || undefined)}
              >
                <option value="">No team</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <input
                className="inline-input"
                placeholder="New project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <input
                className="inline-input"
                placeholder="Short description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
              <button className="btn btn-primary" type="submit" disabled={creatingProject}>
                {creatingProject ? "Creating…" : "Create Project"}
              </button>
            </form>
          </div>
          <ProjectSummary projects={filteredProjects} />
        </section>

        <section className="card">
          <div className="card-header card-header-row" id="task-create-form">
            <div>
              <h2 className="card-title">Task Board</h2>
              <p className="card-subtitle">
                Track work across the lifecycle in real time — click a card to advance it.
              </p>
            </div>
            <form className="inline-form" onSubmit={handleCreateTask}>
              <input
                className="inline-input"
                placeholder="New task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <select
                className="inline-select"
                value={newTaskProjectId}
                onChange={(e) => setNewTaskProjectId(e.target.value || undefined)}
              >
                <option value="">Select project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <select
                className="inline-select"
                value={newTaskTeamId}
                onChange={(e) => setNewTaskTeamId(e.target.value || undefined)}
              >
                <option value="">Team (optional)</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <select
                className="inline-select"
                value={newTaskAssigneeId}
                onChange={(e) => setNewTaskAssigneeId(e.target.value || undefined)}
              >
                <option value="">Assignee (optional)</option>
                {taskAssigneeOptions.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <select
                className="inline-select"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as Task["priority"])}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <input
                className="inline-input"
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
              />
              <button className="btn btn-primary" type="submit" disabled={creatingTask}>
                {creatingTask ? "Creating…" : "Create Task"}
              </button>
            </form>
          </div>
          <TaskBoard tasks={filteredTasks} onAdvanceTask={handleAdvanceTask} />
        </section>
      </div>
      <div className="dashboard-side">
        <ActivityFeed events={events} />
      </div>
    </div>
  );
};

export default Dashboard;


