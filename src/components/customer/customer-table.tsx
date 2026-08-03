"use client";

import { useQueryClient } from "@tanstack/react-query";

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

import { customerService } from "@/services/customer.service";
import { Customer } from "@/types/customer";
import { Button } from "../ui/button";

import { toast } from "sonner";

interface CustomerTableProps {
  customers: Customer[];
  isLoading: boolean;
  onEdit: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  isLoading,
  onEdit,
}: CustomerTableProps) {
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await customerService.deleteCustomer(id);

      await queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      await queryClient.refetchQueries({
        queryKey: ["customers"],
      });

      toast.success("Customer deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete customer.");
    }
  };

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
              className="transition-colors hover:bg-slate-800"
            >
              <TableCell>{index + 1}</TableCell>

              <TableCell className="font-medium">{customer.name}</TableCell>

              <TableCell>{customer.email}</TableCell>

              <TableCell>{customer.phone}</TableCell>

              <TableCell>{customer.company}</TableCell>

              <TableCell>
                <CustomerStatusBadge status={customer.status} />
              </TableCell>

              <TableCell>{customer.lastContact}</TableCell>

              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2 cursor-pointer border-slate-600 bg-slate-700 text-white hover:bg-slate-600"
                  onClick={() => onEdit(customer)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => handleDelete(customer.id)}
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
