const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let dashboardStats = {
  activeSchools: 20,
  studentsReached: 1240,
  openTasks: 18,
  sponsors: 12,
};

app.get("/", (req, res) => {
  res.send("Veritas Outreach API is running");
});

app.get("/api/dashboard", (req, res) => {
  res.json(dashboardStats);
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("dashboard:update", dashboardStats);

  socket.on("engagement:add", () => {
    dashboardStats = {
      ...dashboardStats,
      studentsReached: dashboardStats.studentsReached + 1,
    };

    io.emit("dashboard:update", dashboardStats);
  });

  socket.on("task:complete", () => {
    dashboardStats = {
      ...dashboardStats,
      openTasks: Math.max(0, dashboardStats.openTasks - 1),
    };

    io.emit("dashboard:update", dashboardStats);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});