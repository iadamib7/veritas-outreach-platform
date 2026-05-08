import { schools } from "../data/mockData";

function Schools() {
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

        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
          Add School
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
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