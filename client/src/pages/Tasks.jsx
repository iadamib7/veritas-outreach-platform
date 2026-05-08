import { useState } from "react";
import { tasks as initialTasks } from "../data/mockData";

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      title: formData.title,
      owner: formData.owner,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);

    setFormData({
      title: "",
      owner: "",
      priority: "Medium",
      status: "To Do",
      dueDate: "",
    });

    setShowForm(false);
  }

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

        <button
          onClick={() => setShowForm((currentValue) => !currentValue)}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
        >
          {showForm ? "Close Form" : "Add Task"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold">Add New Task</h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Task Title
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: Send sponsor update report"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Owner
              <input
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: Outreach Team"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Priority
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Overdue</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Due Date
              <input
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                type="date"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
              />
            </label>
          </div>

          <button className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Save Task
          </button>
        </form>
      )}

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