import Link from "next/link";

export default function FiltersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Filters</h1>
      <p className="mt-2 text-slate-400">
        Advanced filtering now lives right on the Customers page, next to the
        search bar, so filters and search stay in sync as you use them.
      </p>

      <Link
        href="/customers"
        className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Go to Customers
      </Link>
    </div>
  );
}
