# FlowBridge 🌉

**Unified Team Collaboration & Workflow Automation**

FlowBridge is a full-stack **TypeScript-based collaboration and workflow automation system** built to demonstrate how modern teams coordinate work in real time. Rather than focusing on surface-level features, this project emphasizes **workflow orchestration, clear architectural boundaries, and real-time system behavior** — the same core ideas that underpin platforms like Microsoft Teams, Jira, or internal enterprise tooling.

This repository is intentionally designed to be **resume-ready, readable, and explainable**, reflecting how an experienced engineer would structure and document a system prototype.

---

## 🎯 What FlowBridge Demonstrates

At its core, FlowBridge models **work as a flow, not a static checklist**.

In real organizations:

* Tasks move through states
* Actions trigger downstream effects
* Teams require shared, real-time context

FlowBridge captures these realities through a centralized workflow engine, event-driven updates, and a clean separation between UI, APIs, and domain logic.

---

## 🧠 Core Capabilities

### Project & Team Management

* Create projects with defined stages
* Organize tasks by status (Backlog, In Progress, Blocked, Done)
* Associate tasks with owners, priorities, and due dates
* Manage teams and ownership explicitly

### Workflow Automation Concepts

* Simple automation rules (e.g., auto-assign or auto-relabel tasks)
* Central **workflowEngine** that applies rules server-side
* Business logic kept out of UI components

### Real-Time Collaboration

* WebSocket (Socket.IO) channel for live updates
* Real-time Kanban board synchronization
* Activity feed driven by system events
* Optimistic UI updates on the client

### Modern Frontend Experience

* React + TypeScript + Vite
* Responsive dashboard layout with sidebar navigation
* Kanban-style task board
* Project overview and real-time activity feed

### Clean Backend Architecture

* Node.js + Express + TypeScript
* Layered design: **routes → controllers → services → workflow engine**
* In-memory data store (no database required)
* Strong typing via shared TypeScript interfaces

---

## 🏗️ Architectural Philosophy

FlowBridge follows a few deliberate design principles:

* **Workflow First** – Tasks are governed by state transitions, not ad-hoc updates
* **Event Awareness** – Meaningful actions emit system-wide events
* **Explicit Boundaries** – Clear separation between transport, domain logic, and UI

These principles mirror how production collaboration systems are built and evolved safely over time.

---

## 📂 Project Structure (Intentional Design)

```
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

The **workflowEngine** is intentionally isolated as the core domain layer, making the system easy to extend with more advanced rules or persistence later.

---

## ⚙️ Prerequisites

* Node.js **18+** and npm
* OS: Windows, macOS, or Linux

---

## 🚀 Backend (Server) — Setup & Run

```bash
cd server
npm install
npm run dev
```

The backend starts on: **[http://localhost:4000](http://localhost:4000)**

### Key REST Endpoints

* `GET /api/projects` – List projects with summary metrics
* `GET /api/tasks` – List tasks
* `POST /api/tasks` – Create a task
* `PATCH /api/tasks/:id` – Update task state, assignee, or priority
* `GET /api/teams` – List teams and members

### WebSocket Channel

* `ws://localhost:4000` (Socket.IO)
* Emits events such as:

  * `task:created`
  * `task:updated`
  * `project:updated`

---

## 🎨 Frontend (Client) — Setup & Run

```bash
cd client
npm install
npm run dev
```

The frontend starts on: **[http://localhost:5173](http://localhost:5173)**

Once running, the UI provides:

* Sidebar navigation (Dashboard, Projects, Teams, Automations)
* A topbar for quick actions and search
* A main dashboard with:

  * Project summary cards
  * A real-time Kanban task board
  * A live activity feed

---

## 👤 Author

**Sriharsan Buttan Suresh**
GitHub: [https://github.com/Sriharsan](https://github.com/Sriharsan)

---

⭐ If you find this project useful or interesting, consider giving it a star.
