"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CustomerToolbarProps {
  search: string;
  sortBy: string;
  activeFilterCount: number;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onExport: () => void;
  onOpenFilters: () => void;
}

export default function CustomerToolbar({
  search,
  sortBy,
  activeFilterCount,
  onSearchChange,
  onSortChange,
  onExport,
  onOpenFilters,
}: CustomerToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 lg:flex-row lg:items-center lg:justify-between">
      <h3 className="mb-2 text-lg font-semibold text-white">Customers</h3>
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search customers..."
          className="pl-10 text-white"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onOpenFilters}
          className="relative cursor-pointer border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
        >
          <SlidersHorizontal size={16} className="mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-10 w-44 cursor-pointer rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-200 outline-none focus:border-blue-500"
        >
          <option value="name">Sort: Name</option>
          <option value="email">Sort: Email</option>
          <option value="company">Sort: Company</option>
          <option value="recent">Sort: Recently Contacted</option>
        </select>

        <Button
          className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
          onClick={onExport}
        >
          Export
        </Button>
      </div>
    </div>
  );
}
