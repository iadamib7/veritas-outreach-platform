import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Dashboard() {
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

  useEffect(() => {
    socket.on("dashboard:update", (newStats) => {
      setStats(newStats);
    });

    return () => {
      socket.off("dashboard:update");
    };
  }, []);

  return (
    <section className="px-6 py-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Live Dashboard
        </p>

        <h2 className="mt-2 text-3xl font-bold">Digital Outreach Platform</h2>

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

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Student Engagement Overview</h3>

        <div className="mt-6 space-y-4">
          {[
            ["Workshop Attendance", "82%", "w-[82%]", "bg-emerald-600"],
            ["Sponsor Updates Completed", "64%", "w-[64%]", "bg-blue-600"],
            ["School Follow-Ups Completed", "76%", "w-[76%]", "bg-purple-600"],
          ].map(([label, value, width, color]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-sm">
                <span>{label}</span>
                <span>{value}</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200">
                <div className={`h-3 rounded-full ${width} ${color}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;