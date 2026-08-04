"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import CustomerStatusBadge from "./customer-status-badge";
import { Customer } from "@/types/customer";

interface CustomerDetailDrawerProps {
  customer: Customer;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export default function CustomerDetailDrawer({
  customer,
  onClose,
  onEdit,
  onDelete,
}: CustomerDetailDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {customer.name}
            </h2>
            <p className="text-sm text-slate-400">{customer.company}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-white"
            aria-label="Close customer details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Email
              </p>
              <p className="text-sm text-slate-200">{customer.email}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Phone
              </p>
              <p className="text-sm text-slate-200">{customer.phone}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Status
              </p>
              <CustomerStatusBadge status={customer.status} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Last Contact
              </p>
              <p className="text-sm text-slate-200">{customer.lastContact}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Created
              </p>
              <p className="text-sm text-slate-200">
                {customer.createdAt.split("T")[0]}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Last Updated
              </p>
              <p className="text-sm text-slate-200">
                {customer.updatedAt.split("T")[0]}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-1 text-xs uppercase tracking-wide text-slate-500">
              Notes
            </p>
            <p className="rounded-md border border-slate-800 bg-slate-950 p-3 text-sm whitespace-pre-wrap text-slate-300">
              {customer.notes || "No notes yet."}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer"
            onClick={() => onDelete(customer.id)}
          >
            Delete
          </Button>

          <Button
            type="button"
            className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => onEdit(customer)}
          >
            Edit Customer
          </Button>
        </div>
      </div>
    </div>
  );
}
