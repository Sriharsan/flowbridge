import { io, Socket } from "socket.io-client";
import type { ActivityEvent, Task, Project } from "./api";

export interface BootstrapPayload {
  tasks: Task[];
  projects: Project[];
  activityEvents: ActivityEvent[];
}

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:4000", {
      transports: ["websocket"]
    });
  }
  return socket;
}


