import { useEffect, useState } from "react";

const API_URL = "https://veritas-outreach-api.onrender.com";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
  });

  async function loadTasks() {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData({
      title: "",
      owner: "",
      priority: "Medium",
      status: "To Do",
      dueDate: "",
    });

    setEditingTaskId(null);
    setShowForm(false);
  }

  function startEditing(task) {
    setEditingTaskId(task.id);

    setFormData({
      title: task.title,
      owner: task.owner,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate.slice(0, 10),
    });

    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingTaskId) {
        const response = await fetch(`${API_URL}/api/tasks/${editingTaskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const updatedTask = await response.json();

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );

        resetForm();
        return;
      }

      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newTask = await response.json();

      setTasks((currentTasks) => [newTask, ...currentTasks]);

      resetForm();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  }

  async function completeTask(taskId) {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}/complete`, {
        method: "PATCH",
      });

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  }

  async function deleteTask(taskId) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  return (
    <section className="px-6 py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#D6A51E]">
            Outreach Workflows
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#0B2545]">Tasks</h2>

          <p className="mt-2 text-slate-600">
            Coordinate follow-ups, workshops, sponsor reports, and school visits.
          </p>
        </div>

        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          className="rounded-xl bg-[#0B2545] px-4 py-2 text-sm font-semibold text-white hover:bg-[#12355B]"
        >
          {showForm ? "Close Form" : "Add Task"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-[#0B2545]">
            {editingTaskId ? "Edit Task" : "Add New Task"}
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Task Title
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-[#D6A51E]"
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
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-[#D6A51E]"
                placeholder="Example: Outreach Team"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Priority
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-[#D6A51E]"
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
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-[#D6A51E]"
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
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-[#D6A51E]"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-3">
            <button className="rounded-xl bg-[#0B2545] px-4 py-2 text-sm font-semibold text-white">
              {editingTaskId ? "Save Changes" : "Save Task"}
            </button>

            {editingTaskId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Loading tasks...</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {tasks.map((task) => (
            <article
              key={task.id}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="text-lg font-bold text-[#0B2545]">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Owner: {task.owner} · Due:{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#D6A51E]/15 px-3 py-1 text-xs font-semibold text-[#0B2545]">
                    {task.priority}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {task.status}
                  </span>

                  <button
                    onClick={() => startEditing(task)}
                    className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Edit
                  </button>

                  {task.status !== "Completed" && (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="rounded-full bg-[#0B2545] px-3 py-1 text-xs font-semibold text-white"
                    >
                      Mark Complete
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Tasks;