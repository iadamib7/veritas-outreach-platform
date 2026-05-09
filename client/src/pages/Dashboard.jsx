import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import veritasLogo from "../assets/veritas-logo.jpeg";

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
      detail: "Partner schools currently active",
    },
    {
      label: "Students Reached",
      value: stats.studentsReached.toLocaleString(),
      detail: "Students tracked across programs",
    },
    {
      label: "Open Tasks",
      value: stats.openTasks,
      detail: "Outstanding outreach workflows",
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
      <div className="rounded-3xl bg-gradient-to-br from-[#0B2545] via-[#12355B] to-[#07182F] px-6 py-8 text-white shadow-sm">
        <div className="flex flex-col gap-8">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <img
                  src={veritasLogo}
                  alt="The Veritas Foundation Inc. logo"
                  className="h-20 w-20 rounded-xl object-contain"
                />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D6A51E]">
                  The Veritas Foundation Inc.
                </p>

                <p className="mt-1 text-sm text-slate-200">
                  Outreach Management System
                </p>
              </div>
            </div>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Digital Outreach Platform
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-100">
              A centralized command center for managing school partnerships,
              tracking student engagement, and coordinating outreach tasks.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => socket.emit("engagement:add")}
                className="rounded-xl bg-[#D6A51E] px-4 py-2 text-sm font-semibold text-[#0B2545] shadow-sm hover:bg-[#E7B92C]"
              >
                Add Student Engagement
              </button>

              <button
                onClick={() => socket.emit("task:complete")}
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20"
              >
                Complete Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>

            <p className="mt-2 text-3xl font-bold text-[#0B2545]">
              {stat.value}
            </p>

            <p className="mt-1 text-sm text-slate-500">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-semibold text-[#0B2545]">
              Student Engagement Overview
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Snapshot of current outreach progress across schools and programs.
            </p>
          </div>

          <span className="rounded-full bg-[#D6A51E]/15 px-3 py-1 text-xs font-semibold text-[#0B2545]">
            Live Metrics
          </span>
        </div>

        <div className="mt-6 space-y-5">
          {[
            ["Workshop Attendance", "82%", "w-[82%]", "bg-[#D6A51E]"],
            ["Sponsor Updates Completed", "64%", "w-[64%]", "bg-[#0B2545]"],
            ["School Follow-Ups Completed", "76%", "w-[76%]", "bg-[#12355B]"],
          ].map(([label, value, width, color]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="font-semibold text-[#0B2545]">{value}</span>
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

