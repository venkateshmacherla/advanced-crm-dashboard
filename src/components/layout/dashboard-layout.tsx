"use client";

import { ReactNode, useState } from "react";

import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <AppSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="flex flex-1 flex-col">
        <AppHeader onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
