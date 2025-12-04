import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { config } from "./config";
import { createApiRouter } from "./routes";
import { db } from "./dataStore";

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true
  })
);
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.corsOrigin
  }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("bootstrap", {
    tasks: db.tasks,
    projects: db.projects,
    activityEvents: db.activityEvents
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", createApiRouter(io));

server.listen(config.port, () => {
  console.log(`FlowBridge API listening on http://localhost:${config.port}`);
});


