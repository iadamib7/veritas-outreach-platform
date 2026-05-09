import { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    schoolName: "",
    program: "",
    attendance: "",
    engagementScore: "",
    sponsorStatus: "Pending",
  });

  async function loadStudents() {
    try {
      const response = await fetch("http://localhost:5000/api/students");

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
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
      name: "",
      schoolName: "",
      program: "",
      attendance: "",
      engagementScore: "",
      sponsorStatus: "Pending",
    });

    setEditingStudentId(null);
    setShowForm(false);
  }

  function startEditing(student) {
    setEditingStudentId(student.id);

    setFormData({
      name: student.name,
      schoolName: student.schoolName,
      program: student.program,
      attendance: student.attendance,
      engagementScore: student.engagementScore,
      sponsorStatus: student.sponsorStatus,
    });

    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingStudentId) {
        const response = await fetch(
          `http://localhost:5000/api/students/${editingStudentId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const updatedStudent = await response.json();

        setStudents((currentStudents) =>
          currentStudents.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );

        resetForm();
        return;
      }

      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newStudent = await response.json();

      setStudents((currentStudents) => [newStudent, ...currentStudents]);

      resetForm();
    } catch (error) {
      console.error("Failed to save student:", error);
    }
  }

  async function deleteStudent(studentId) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/students/${studentId}`, {
        method: "DELETE",
      });

      setStudents((currentStudents) =>
        currentStudents.filter((student) => student.id !== studentId)
      );
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  }

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

        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
        >
          {showForm ? "Close Form" : "Add Student"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold">
            {editingStudentId ? "Edit Student" : "Add New Student"}
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Student Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: Kojo Appiah"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              School
              <input
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: Kumasi High School"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Program
              <input
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: STEM Mentorship"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Sponsor Status
              <select
                name="sponsorStatus"
                value={formData.sponsorStatus}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
              >
                <option>Pending</option>
                <option>Sponsored</option>
                <option>Not Sponsored</option>
              </select>
            </label>

            <label className="text-sm font-medium text-slate-700">
              Attendance Count
              <input
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                required
                type="number"
                min="0"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: 8"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Engagement Score
              <input
                name="engagementScore"
                value={formData.engagementScore}
                onChange={handleChange}
                required
                type="number"
                min="0"
                max="100"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="Example: 86"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-3">
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              {editingStudentId ? "Save Changes" : "Save Student"}
            </button>

            {editingStudentId && (
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
          <p className="text-sm text-slate-500">Loading students...</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {students.map((student) => (
            <article
              key={student.id}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">{student.name}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {student.schoolName}
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {student.sponsorStatus}
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-600">{student.program}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Attendance</p>

                  <p className="mt-1 text-xl font-bold">
                    {student.attendance}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Engagement</p>

                  <p className="mt-1 text-xl font-bold">
                    {student.engagementScore}%
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => startEditing(student)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteStudent(student.id)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Students;