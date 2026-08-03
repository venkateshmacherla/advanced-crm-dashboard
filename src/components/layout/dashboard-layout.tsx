import { ReactNode } from "react";

import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <AppHeader />

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
