"use client";

import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import SidebarItem from "./sidebar-item";
import { navigation } from "@/constants/navigation";

interface AppSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AppSidebar({ mobileOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
        <h1 className="text-xl font-bold text-white">CRM Dashboard</h1>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
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
      <aside className="hidden w-64 border-r border-slate-800 bg-slate-950 lg:flex lg:flex-col">
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

          <aside className="relative flex h-full w-64 flex-col bg-slate-950 shadow-2xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
