"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomerToolbar() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <Input placeholder="Search customers..." className="pl-10" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select>
          <SelectTrigger className="w-40 cursor-pointer">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              All
            </SelectItem>
            <SelectItem value="active" className="cursor-pointer">
              Active
            </SelectItem>
            <SelectItem value="inactive" className="cursor-pointer">
              Inactive
            </SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-44 cursor-pointer">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="name" className="cursor-pointer">
              Name
            </SelectItem>

            <SelectItem value="company" className="cursor-pointer">
              Company
            </SelectItem>

            <SelectItem value="recent" className="cursor-pointer">
              Recently Added
            </SelectItem>
          </SelectContent>
        </Select>

        <Button className="cursor-pointer">Export</Button>
      </div>
    </div>
  );
}
