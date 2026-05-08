import { tasks } from "../data/mockData";

function Tasks() {
  return (
    <section className="px-6 py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Outreach Workflows
          </p>

          <h2 className="mt-2 text-3xl font-bold">Tasks</h2>

          <p className="mt-2 text-slate-600">
            Coordinate follow-ups, workshops, sponsor reports, and school visits.
          </p>
        </div>

        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
          Add Task
        </button>
      </div>

      <div className="mt-8 grid gap-4">
        {tasks.map((task) => (
          <article key={task.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-lg font-bold">{task.title}</h3>

                <p className="mt-1 text-sm text-slate-500">
                  Owner: {task.owner} · Due: {task.dueDate}
                </p>
              </div>

              <div className="flex gap-2">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                  {task.priority}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {task.status}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Tasks;