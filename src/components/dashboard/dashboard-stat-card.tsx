import { LucideIcon, TrendingDown, TrendingUp, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { DashboardStat } from "@/hooks/useDashboardMetrics";

interface DashboardStatCardProps {
  stat: DashboardStat;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function DashboardStatCard({
  stat,
  icon: Icon,
  iconBg,
  iconColor,
}: DashboardStatCardProps) {
  const TrendIcon =
    stat.trendDirection === "up"
      ? TrendingUp
      : stat.trendDirection === "down"
        ? TrendingDown
        : Minus;

  const trendColor =
    stat.trendDirection === "up"
      ? "text-green-500"
      : stat.trendDirection === "down"
        ? "text-red-500"
        : "text-slate-400";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-lg",
            iconBg,
          )}
        >
          <Icon size={20} className={iconColor} />
        </div>

        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trendColor,
          )}
        >
          <TrendIcon size={14} />
          {stat.trend > 0 ? "+" : ""}
          {stat.trend}%
        </div>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-white">
        {stat.value.toLocaleString()}
      </h2>

      <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
    </div>
  );
}
