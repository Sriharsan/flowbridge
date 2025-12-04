## FlowBridge – Unified Team Collaboration & Workflow Automation

FlowBridge is a full‑stack TypeScript project that demonstrates a modern workflow automation and collaboration platform. It combines **task orchestration**, **team/project management**, and **real‑time progress tracking** in a clean, resume‑ready codebase.

### Features

- **Project & Team Management**
  - Create projects, define stages, and assign tasks.
  - Organize tasks by status (Backlog, In Progress, Blocked, Done).
  - Associate tasks with owners, due dates, and priority.

- **Workflow Automation Concepts**
  - Define simple automation rules (e.g., auto‑assign or auto‑relabel tasks by priority and status).
  - Central `workflowEngine` layer to apply rules server‑side.

- **Real‑Time Collaboration**
  - WebSocket (Socket.IO) channel for live task board updates.
  - Optimistic UI updates on the client.

- **Modern Frontend**
  - React + TypeScript + Vite.
  - Responsive dashboard layout with sidebar navigation.
  - Kanban‑style board for tasks, project overview, and activity feed.

- **Clean Backend Architecture**
  - Node.js + Express + TypeScript.
  - Layered design: routing → controllers → services → workflow engine.
  - In‑memory data store (no DB required) with types and seed data.

---

### Project Structure

```text
flowbridge/
  README.md
  server/
    package.json
    tsconfig.json
    src/
      index.ts
      config.ts
      types.ts
      dataStore.ts
      workflowEngine.ts
      routes/
        index.ts
        projects.ts
        tasks.ts
        teams.ts
  client/
    package.json
    tsconfig.json
    vite.config.ts
    index.html
    src/
      main.tsx
      App.tsx
      api.ts
      socket.ts
      styles.css
      components/
        Layout.tsx
        Sidebar.tsx
        Topbar.tsx
        Dashboard.tsx
        TaskBoard.tsx
        ProjectSummary.tsx
        ActivityFeed.tsx
```

---

### Prerequisites

- Node.js 18+ and npm installed
- OS: Works on Windows, macOS, and Linux

---

### Backend (server) – Setup & Run

```bash
cd server
npm install
npm run dev
```

The backend will start on `http://localhost:4000`.

Key endpoints:

- `GET /api/projects` – list projects with simple metrics
- `GET /api/tasks` – list tasks
- `POST /api/tasks` – create a task
- `PATCH /api/tasks/:id` – update a task (status, assignee, etc.)
- `GET /api/teams` – list teams and their members

WebSocket namespace:

- `ws://localhost:4000` (Socket.IO) – emits `task:created`, `task:updated`, `project:updated`

---

### Frontend (client) – Setup & Run

```bash
cd client
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` (Vite default).

Open that URL in your browser and you’ll see:

- A **sidebar** for navigation (Dashboard, Projects, Teams, Automations).
- A **topbar** with search and quick actions.
- A main **dashboard** with:
  - Project summary cards
  - A kanban‑style **Task Board**
  - A right‑side **Activity Feed** that updates in real time

---

### How to Describe This on Your Resume

You can confidently describe FlowBridge like this:

- **FlowBridge – Unified Team Collaboration & Workflow Automation Tool**
  - Engineered a full‑stack workflow automation platform using **React, Vite, TypeScript, and Node.js/Express**, enabling seamless task assignment and project orchestration for cross‑functional teams.
  - Implemented a **real‑time kanban task board** with Socket.IO, delivering live progress tracking, automated status updates, and actionable insights that streamline team operations and boost productivity.
  - Designed a clean, layered backend architecture (routing, services, workflow engine) with strong TypeScript typing and reusable UI components for a modern, responsive dashboard experience.

---

### Customization Ideas

- Replace the in‑memory data store with a real database (PostgreSQL + Prisma, MongoDB, etc.).
- Add authentication (JWT, sessions, or OAuth).
- Implement more advanced workflow rules or a visual rule builder on the frontend.
- Deploy the client and server (e.g., Vercel for frontend, Render/Fly/Heroku for backend).


