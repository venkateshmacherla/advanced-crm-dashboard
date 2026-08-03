import DashboardLayout from "@/components/layout/dashboard-layout";

export default function Home() {
  return (
    <DashboardLayout>
      <div>
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>

        <p className="mt-2 text-slate-400">
          Welcome to the Advanced CRM Dashboard.
        </p>
      </div>
    </DashboardLayout>
  );
}
