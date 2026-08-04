import { useMemo } from "react";

import { Customer } from "@/types/customer";

export interface DashboardStat {
  label: string;
  value: number;
  /** Percentage change vs. the prior comparable period. */
  trend: number;
  trendDirection: "up" | "down" | "flat";
}

export interface DashboardMetrics {
  totalCustomers: DashboardStat;
  activeLeads: DashboardStat;
  contactedThisWeek: DashboardStat;
}

function daysAgoDate(days: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return date;
}

function toStat(label: string, value: number, previous: number): DashboardStat {
  if (previous === 0) {
    return {
      label,
      value,
      trend: value > 0 ? 100 : 0,
      trendDirection: value > 0 ? "up" : "flat",
    };
  }

  const trend = ((value - previous) / previous) * 100;

  return {
    label,
    value,
    trend: Math.round(trend * 10) / 10,
    trendDirection: trend > 0 ? "up" : trend < 0 ? "down" : "flat",
  };
}

/**
 * Derives the three headline dashboard metrics straight from the
 * customer list — no separate "leads/calls" data model exists yet,
 * so:
 *  - Active Leads = customers currently marked "Active"
 *  - Contacted This Week = customers whose lastContact falls in the
 *    last 7 days, trended against the 7 days before that
 */
export function useDashboardMetrics(customers: Customer[]): DashboardMetrics {
  return useMemo(() => {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // --- Total customers: growth this month vs last month ---
    const createdThisMonth = customers.filter(
      (c) => new Date(c.createdAt) >= startOfThisMonth,
    ).length;

    const createdLastMonth = customers.filter((c) => {
      const created = new Date(c.createdAt);
      return created >= startOfLastMonth && created < startOfThisMonth;
    }).length;

    const totalCustomers = toStat(
      "Total Customers",
      customers.length,
      customers.length - createdThisMonth + createdLastMonth,
    );

    // --- Active leads: active customers now vs a month ago ---
    const activeNow = customers.filter((c) => c.status === "Active").length;

    const activeAMonthAgo = customers.filter((c) => {
      // Approximate "active a month ago" using customers that existed
      // and were active as of their last known update before this month.
      const created = new Date(c.createdAt);
      return created < startOfThisMonth && c.status === "Active";
    }).length;

    const activeLeads = toStat("Active Leads", activeNow, activeAMonthAgo);

    // --- Contacted this week vs the week before ---
    const sevenDaysAgo = daysAgoDate(7);
    const fourteenDaysAgo = daysAgoDate(14);

    const contactedThisWeekCount = customers.filter(
      (c) => new Date(c.lastContact) >= sevenDaysAgo,
    ).length;

    const contactedPriorWeekCount = customers.filter((c) => {
      const lastContact = new Date(c.lastContact);
      return lastContact >= fourteenDaysAgo && lastContact < sevenDaysAgo;
    }).length;

    const contactedThisWeek = toStat(
      "Contacted This Week",
      contactedThisWeekCount,
      contactedPriorWeekCount,
    );

    return { totalCustomers, activeLeads, contactedThisWeek };
  }, [customers]);
}
