import { useEffect, useState } from "react";

function Schools() {
  const [schools, setSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    region: "Ashanti Region",
    contact: "",
    status: "Prospective",
    studentsCount: "",
    lastContacted: "",
  });

  async function loadSchools() {
    try {
      const response = await fetch("http://localhost:5000/api/schools");
      const data = await response.json();

      setSchools(data);
    } catch (error) {
      console.error("Failed to load schools:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSchools();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newSchool = await response.json();

      setSchools((currentSchools) => [newSchool, ...currentSchools]);

      setFormData({
        name: "",
        region: "Ashanti Region",
        contact: "",
        status: "Prospective",
        studentsCount: "",
        lastContacted: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Failed to create school:", error);
    }
  }

  async function deleteSchool(schoolId) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this school?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/schools/${schoolId}`, {
        method: "DELETE",
      });

      setSchools((currentSchools) =>
        currentSchools.filter((school) => school.id !== schoolId)
      );
    } catch (error) {
      console.error("Failed to delete school:", error);
    }
  }

  return (
    <section className="px-6 py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Partnership Management
          </p>

          <h2 className="mt-2 text-3xl font-bold">Schools</h2>

          <p className="mt-2 text-slate-600">
            Track partner schools, contacts, partnership status, and follow-ups.
          </p>
        </div>

        <button
          onClick={() => setShowForm((currentValue) => !currentValue)}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
        >
          {showForm ? "Close Form" : "Add School"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold">Add New School</h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              School Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: Kumasi High School"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Region
              <input
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Contact Person
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: Ama Mensah"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Partnership Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
              >
                <option>Prospective</option>
                <option>Contacted</option>
                <option>Active</option>
                <option>Needs Follow-Up</option>
                <option>Inactive</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Number of Students
              <input
                name="studentsCount"
                value={formData.studentsCount}
                onChange={handleChange}
                required
                type="number"
                min="0"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: 180"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Last Contacted
              <input
                name="lastContacted"
                value={formData.lastContacted}
                onChange={handleChange}
                required
                type="date"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
              />
            </label>
          </div>

          <button className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Save School
          </button>
        </form>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm">
        {isLoading ? (
          <p className="p-6 text-sm text-slate-500">Loading schools...</p>
        ) : (
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-4">School</th>
                <th className="px-5 py-4">Region</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Students</th>
                <th className="px-5 py-4">Last Contacted</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {schools.map((school) => (
                <tr key={school.id}>
                  <td className="px-5 py-4 font-medium">{school.name}</td>
                  <td className="px-5 py-4">{school.region}</td>
                  <td className="px-5 py-4">{school.contact}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {school.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">{school.studentsCount}</td>
                  <td className="px-5 py-4">
                    {new Date(school.lastContacted).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => deleteSchool(school.id)}
                      className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Schools;