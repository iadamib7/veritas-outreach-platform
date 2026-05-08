import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Schools", path: "/schools" },
    { label: "Students", path: "/students" },
    { label: "Tasks", path: "/tasks" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 bg-white p-6 md:block">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Veritas Foundation
        </p>

        <h1 className="mt-2 text-xl font-bold">Outreach Platform</h1>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="md:ml-64">
        <div className="border-b border-slate-200 bg-white px-6 py-4 md:hidden">
          <p className="font-bold">Veritas Outreach Platform</p>

          <div className="mt-3 flex gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

export default Layout;