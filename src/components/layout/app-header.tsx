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
          <Avatar className="ring-1 ring-slate-700">
            <AvatarFallback className="bg-blue-500/20 font-semibold text-blue-400">
              AD
            </AvatarFallback>
          </Avatar>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              {CURRENT_USER.name}
            </p>

            <p className="text-xs text-slate-400">{CURRENT_USER.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
