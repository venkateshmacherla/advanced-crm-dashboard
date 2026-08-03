"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CustomerToolbarProps {
  search: string;
  status: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function CustomerToolbar({
  search,
  status,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: CustomerToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 lg:flex-row lg:items-center lg:justify-between">
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
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-10 w-40 cursor-pointer rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-200 outline-none focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-10 w-44 cursor-pointer rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-slate-200 outline-none focus:border-blue-500"
        >
          <option value="name">Name</option>
          <option value="company">Company</option>
          <option value="recent">Recently Added</option>
        </select>

        <Button className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
          Export
        </Button>
      </div>
    </div>
  );
}
