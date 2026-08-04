"use client";

import { Bell, Menu } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppHeaderProps {
  onMenuClick?: () => void;
}

// Static for now — swap for the authenticated user once auth exists.
const CURRENT_USER = { name: "Admin User", email: "admin@crm.com" };

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="cursor-pointer rounded-lg p-2 text-slate-600 transition hover:bg-slate-200 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold text-slate-900 lg:hidden dark:text-white">
          CRM Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2 pl-1">
          <Avatar className="ring-1 ring-slate-300 dark:ring-slate-700">
            <AvatarFallback className="bg-blue-500/20 font-semibold text-blue-600 dark:text-blue-400">
              AD
            </AvatarFallback>
          </Avatar>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {CURRENT_USER.name}
            </p>

            <p className="text-xs text-slate-500">{CURRENT_USER.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
