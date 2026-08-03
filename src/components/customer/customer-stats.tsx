"use client";

interface CustomerStatsProps {
  total: number;
  active: number;
  inactive: number;
  newThisMonth: number;
}

export default function CustomerStats({
  total,
  active,
  inactive,
  newThisMonth,
}: CustomerStatsProps) {
  const stats = [
    {
      title: "Total Customers",
      value: total,
    },
    {
      title: "Active",
      value: active,
    },
    {
      title: "Inactive",
      value: inactive,
    },
    {
      title: "New This Month",
      value: newThisMonth,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <p className="text-sm text-slate-400">{item.title}</p>

          <h2 className="mt-3 text-4xl font-bold text-white">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}
