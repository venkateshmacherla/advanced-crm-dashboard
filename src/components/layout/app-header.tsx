import { Bell, Search, UserCircle2 } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2">
        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          placeholder="Search customers..."
          className="w-64 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 transition hover:bg-slate-800">
          <Bell size={20} className="text-slate-300" />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle2 size={34} className="text-slate-300" />

          <div>
            <p className="text-sm font-medium text-white">Admin</p>

            <p className="text-xs text-slate-400">admin@crm.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
