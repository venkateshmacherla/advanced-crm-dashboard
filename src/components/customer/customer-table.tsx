"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CustomerEmptyState from "./customer-empty-state";
import CustomerStatusBadge from "./customer-status-badge";

import { Customer } from "@/types/customer";
import { Button } from "../ui/button";

interface CustomerTableProps {
  customers: Customer[];
  isLoading: boolean;
}

export default function CustomerTable({
  customers,
  isLoading,
}: CustomerTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Loading customers...
      </div>
    );
  }

  if (customers.length === 0) {
    return <CustomerEmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <Table className="text-slate-200">
        <TableHeader className="bg-slate-950">
          <TableRow>
            <TableHead className="w-16 text-slate-300">#</TableHead>
            <TableHead className="text-slate-300">Name</TableHead>
            <TableHead className="text-slate-300">Email</TableHead>
            <TableHead className="text-slate-300">Phone</TableHead>
            <TableHead className="text-slate-300">Company</TableHead>
            <TableHead className="text-slate-300">Status</TableHead>
            <TableHead className="text-slate-300">Last Contact</TableHead>
            <TableHead className="text-right text-slate-300">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.map((customer, index) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer transition-colors hover:bg-slate-800"
            >
              <TableCell className="text-slate-400">{index + 1}</TableCell>

              <TableCell className="font-medium text-white">
                {customer.name}
              </TableCell>

              <TableCell className="text-slate-300">{customer.email}</TableCell>

              <TableCell className="text-slate-300">{customer.phone}</TableCell>

              <TableCell className="text-slate-300">
                {customer.company}
              </TableCell>

              <TableCell>
                <CustomerStatusBadge status={customer.status} />
              </TableCell>

              <TableCell className="text-slate-300">
                {customer.lastContact}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2 cursor-pointer bg-slate-700 text-white border-slate-600"
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
