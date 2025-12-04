import { Router } from "express";
import projectsRouter from "./projects";
import tasksRouter, { attachTaskSocket } from "./tasks";
import teamsRouter from "./teams";
import activityRouter from "./activity";
import type { Server } from "socket.io";

const router = Router();

export function createApiRouter(io: Server) {
  attachTaskSocket(io);

  router.use("/projects", projectsRouter);
  router.use("/tasks", tasksRouter);
  router.use("/teams", teamsRouter);
  router.use("/activity", activityRouter);

  return router;
}

export default router;


