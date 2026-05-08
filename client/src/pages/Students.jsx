import { students } from "../data/mockData";

function Students() {
  return (
    <section className="px-6 py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Engagement Tracking
          </p>

          <h2 className="mt-2 text-3xl font-bold">Students</h2>

          <p className="mt-2 text-slate-600">
            Monitor participation, program involvement, and sponsor status.
          </p>
        </div>

        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
          Add Student
        </button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {students.map((student) => (
          <article key={student.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">{student.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{student.school}</p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {student.sponsorStatus}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-600">{student.program}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Attendance</p>
                <p className="mt-1 text-xl font-bold">{student.attendance}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Engagement</p>
                <p className="mt-1 text-xl font-bold">
                  {student.engagementScore}%
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Students;