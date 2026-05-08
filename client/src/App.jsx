import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [stats, setStats] = useState({
    activeSchools: 0,
    studentsReached: 0,
    openTasks: 0,
    sponsors: 0,
  });

  const statCards = [
    {
      label: "Active Schools",
      value: stats.activeSchools,
      detail: "Partner schools onboarded",
    },
    {
      label: "Students Reached",
      value: stats.studentsReached.toLocaleString(),
      detail: "Across outreach programs",
    },
    {
      label: "Open Tasks",
      value: stats.openTasks,
      detail: "Follow-ups and coordination work",
    },
    {
      label: "Sponsors",
      value: stats.sponsors,
      detail: "Community and funding partners",
    },
  ];

  const tasks = [
    "Follow up with Kumasi High School",
    "Send sponsor update report",
    "Review student engagement logs",
    "Schedule next outreach workshop",
  ];

  useEffect(() => {
    socket.on("dashboard:update", (newStats) => {
      setStats(newStats);
    });

    return () => {
      socket.off("dashboard:update");
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Veritas Foundation Inc.
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Digital Outreach Platform
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Coordinate school partnerships, student engagement, sponsors, and
            outreach workflows from one dashboard.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => socket.emit("engagement:add")}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Add Student Engagement
            </button>

            <button
              onClick={() => socket.emit("task:complete")}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Complete Task
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold">
              Student Engagement Overview
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Workshop Attendance</span>
                  <span>82%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[82%] rounded-full bg-emerald-600" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Sponsor Updates Completed</span>
                  <span>64%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[64%] rounded-full bg-blue-600" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>School Follow-Ups Completed</span>
                  <span>76%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[76%] rounded-full bg-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Priority Tasks</h2>

            <ul className="mt-4 space-y-3">
              {tasks.map((task) => (
                <li
                  key={task}
                  className="rounded-xl border border-slate-200 p-3 text-sm"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
