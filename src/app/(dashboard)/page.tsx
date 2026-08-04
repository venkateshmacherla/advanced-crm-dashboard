"use client";

import Link from "next/link";
import { Phone, Rocket, Users } from "lucide-react";

import DashboardStatCard from "@/components/dashboard/dashboard-stat-card";
import CustomerAvatar from "@/components/customer/customer-avatar";
import CustomerStatusBadge from "@/components/customer/customer-status-badge";
import { Button } from "@/components/ui/button";

import { useCustomers } from "@/hooks/useCustomers";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

export default function DashboardPage() {
  const { data: customers = [], isLoading, isError } = useCustomers();
  const { totalCustomers, activeLeads, contactedThisWeek } =
    useDashboardMetrics(customers);

  const recentCustomers = [...customers]
    .sort(
      (a, b) =>
        new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Welcome back — here&apos;s what&apos;s happening with your customers.
        </p>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-900 bg-red-950/40 p-6 text-center text-red-300">
          Failed to load dashboard data.
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-34 animate-pulse rounded-xl border border-slate-800 bg-slate-900"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          <DashboardStatCard
            stat={totalCustomers}
            icon={Users}
            iconBg="bg-blue-500/15"
            iconColor="text-blue-400"
          />

          <DashboardStatCard
            stat={activeLeads}
            icon={Rocket}
            iconBg="bg-amber-500/15"
            iconColor="text-amber-400"
          />

          <DashboardStatCard
            stat={contactedThisWeek}
            icon={Phone}
            iconBg="bg-pink-500/15"
            iconColor="text-pink-400"
          />
        </div>
      )}

      <div className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Recently Contacted
          </h2>

          <Link href="/customers">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
            >
              View all customers
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-slate-800">
          {!isLoading && recentCustomers.length === 0 && (
            <p className="px-6 py-6 text-sm text-slate-400">
              No customers yet.
            </p>
          )}

          {recentCustomers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <CustomerAvatar name={customer.name} size="sm" />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {customer.name}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {customer.company}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <span className="text-xs text-slate-500">
                  {customer.lastContact}
                </span>
                <CustomerStatusBadge status={customer.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
