"use client";

import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import SidebarItem from "./sidebar-item";
import { navigation } from "@/constants/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AppSidebar({ mobileOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          CRM Dashboard
        </h1>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-slate-500 hover:text-slate-900 lg:hidden dark:text-slate-400 dark:hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <Avatar className="ring-1 ring-slate-300 dark:ring-slate-700">
          <AvatarFallback className="bg-blue-500/20 font-semibold text-blue-600 dark:text-blue-400">
            AD
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
            Admin User
          </p>
          <p className="truncate text-xs text-slate-500">admin@crm.com</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            href={item.href}
            icon={item.icon}
            active={pathname === item.href}
            onNavigate={onClose}
          />
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col dark:border-slate-800 dark:bg-slate-950">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />

          <aside className="relative flex h-full w-64 flex-col bg-white shadow-2xl dark:bg-slate-950">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
