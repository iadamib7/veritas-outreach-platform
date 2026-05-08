import { useState } from "react";
import { schools as initialSchools } from "../data/mockData";

function Schools() {
  const [schools, setSchools] = useState(initialSchools);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    region: "Ashanti Region",
    contact: "",
    status: "Prospective",
    students: "",
    lastContacted: "",
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

    const newSchool = {
      id: Date.now(),
      name: formData.name,
      region: formData.region,
      contact: formData.contact,
      status: formData.status,
      students: Number(formData.students),
      lastContacted: formData.lastContacted,
    };

    setSchools((currentSchools) => [newSchool, ...currentSchools]);

    setFormData({
      name: "",
      region: "Ashanti Region",
      contact: "",
      status: "Prospective",
      students: "",
      lastContacted: "",
    });

    setShowForm(false);
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
                name="students"
                value={formData.students}
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
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-4">School</th>
              <th className="px-5 py-4">Region</th>
              <th className="px-5 py-4">Contact</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Students</th>
              <th className="px-5 py-4">Last Contacted</th>
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
                <td className="px-5 py-4">{school.students}</td>
                <td className="px-5 py-4">{school.lastContacted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Schools;