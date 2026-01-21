import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { PORT, CORS_ORIGIN } from "./config/index.js";
import RoomManager from "./models/roomManager.js";
import setupSocket from "./controllers/socketController.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: CORS_ORIGIN, methods: ["GET", "POST"] },
});

app.use(cors());
app.get("/", (_, res) => res.json({ status: "Server running" }));

const manager = new RoomManager(io);
setupSocket(io, manager);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
