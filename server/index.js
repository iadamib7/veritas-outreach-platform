require("dotenv/config");

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
  "http://localhost:5179",
  "http://localhost:5180",
  "http://localhost:5181",
  "https://veritas-outreach-platform.vercel.app",
  "https://veritas-outreach-platform-m1nm1sxzg-ibrahim-adam-s-projects.vercel.app",
];

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const app = express();

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

async function getDashboardStats() {
  const activeSchools = await prisma.school.count({
    where: {
      status: "Active",
    },
  });

  const studentsReached = await prisma.student.count();

  const openTasks = await prisma.task.count({
    where: {
      NOT: {
        status: "Completed",
      },
    },
  });

  return {
    activeSchools,
    studentsReached,
    openTasks,
    sponsors: 12,
  };
}

async function broadcastDashboardStats() {
  const dashboardStats = await getDashboardStats();

  io.emit("dashboard:update", dashboardStats);
}

app.get("/", (req, res) => {
  res.send("Veritas Outreach API is running");
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const dashboardStats = await getDashboardStats();

    res.json(dashboardStats);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
});

app.get("/api/schools", async (req, res) => {
  try {
    const schools = await prisma.school.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(schools);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load schools",
    });
  }
});

app.post("/api/schools", async (req, res) => {
  try {
    const { name, region, contact, status, studentsCount, lastContacted } =
      req.body;

    const school = await prisma.school.create({
      data: {
        name,
        region,
        contact,
        status,
        studentsCount: Number(studentsCount),
        lastContacted: new Date(lastContacted),
      },
    });

    await broadcastDashboardStats();

    res.status(201).json(school);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create school",
    });
  }
});

app.patch("/api/schools/:id", async (req, res) => {
  try {
    const { name, region, contact, status, studentsCount, lastContacted } =
      req.body;

    const school = await prisma.school.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        region,
        contact,
        status,
        studentsCount: Number(studentsCount),
        lastContacted: new Date(lastContacted),
      },
    });

    await broadcastDashboardStats();

    res.json(school);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update school",
    });
  }
});

app.delete("/api/schools/:id", async (req, res) => {
  try {
    const school = await prisma.school.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    await broadcastDashboardStats();

    res.json(school);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete school",
    });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(students);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load students",
    });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const {
      name,
      schoolName,
      program,
      attendance,
      engagementScore,
      sponsorStatus,
    } = req.body;

    const student = await prisma.student.create({
      data: {
        name,
        schoolName,
        program,
        attendance: Number(attendance),
        engagementScore: Number(engagementScore),
        sponsorStatus,
      },
    });

    await broadcastDashboardStats();

    res.status(201).json(student);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create student",
    });
  }
});

app.patch("/api/students/:id", async (req, res) => {
  try {
    const {
      name,
      schoolName,
      program,
      attendance,
      engagementScore,
      sponsorStatus,
    } = req.body;

    const student = await prisma.student.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        schoolName,
        program,
        attendance: Number(attendance),
        engagementScore: Number(engagementScore),
        sponsorStatus,
      },
    });

    await broadcastDashboardStats();

    res.json(student);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update student",
    });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await prisma.student.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    await broadcastDashboardStats();

    res.json(student);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete student",
    });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load tasks",
    });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, owner, priority, status, dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        owner,
        priority,
        status,
        dueDate: new Date(dueDate),
      },
    });

    await broadcastDashboardStats();

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const { title, owner, priority, status, dueDate } = req.body;

    const task = await prisma.task.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title,
        owner,
        priority,
        status,
        dueDate: new Date(dueDate),
      },
    });

    await broadcastDashboardStats();

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

app.patch("/api/tasks/:id/complete", async (req, res) => {
  try {
    const task = await prisma.task.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: "Completed",
      },
    });

    await broadcastDashboardStats();

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to complete task",
    });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    await broadcastDashboardStats();

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

io.on("connection", async (socket) => {
  console.log("A user connected:", socket.id);

  const dashboardStats = await getDashboardStats();

  socket.emit("dashboard:update", dashboardStats);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});