"use client";

import { Bell, Menu, UserCircle2 } from "lucide-react";

interface AppHeaderProps {
  onMenuClick?: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="cursor-pointer rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold text-white lg:hidden">
          CRM Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 transition hover:bg-slate-800">
          <Bell size={20} className="text-slate-300" />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle2 size={34} className="text-slate-300" />

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">Admin</p>

            <p className="text-xs text-slate-400">admin@crm.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
