export default function CustomerStats() {
  const stats = [
    {
      title: "Total Customers",
      value: "120",
    },
    {
      title: "Active",
      value: "96",
    },
    {
      title: "Inactive",
      value: "24",
    },
    {
      title: "New This Month",
      value: "18",
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <p className="text-sm text-slate-400">{item.title}</p>

          <h2 className="mt-3 text-3xl font-bold text-white">{item.value}</h2>
        </div>
      ))}
    </section>
  );
}
