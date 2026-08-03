"use client";

import { usePathname } from "next/navigation";

import SidebarItem from "./sidebar-item";
import { navigation } from "@/constants/navigation";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r border-slate-800 bg-slate-950 lg:flex lg:flex-col">
      <div className="border-b border-slate-800 px-6 py-5">
        <h1 className="text-xl font-bold text-white">CRM Dashboard</h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            href={item.href}
            icon={item.icon}
            active={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}
