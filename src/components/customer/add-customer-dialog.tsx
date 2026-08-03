"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import CustomerForm from "./customer-form";

export default function AddCustomerDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className=" bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        + Add Customer
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
          <div className="flex w-full max-w-xl max-h-[90vh] flex-col rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Add Customer</h2>

              <Button
                type="button"
                variant="ghost"
                className="cursor-pointer text-slate-400 hover:text-white"
                onClick={() => setOpen(false)}
              >
                ✕
              </Button>
            </div>

            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <CustomerForm onClose={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
