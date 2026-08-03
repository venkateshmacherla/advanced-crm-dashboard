"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CustomerForm from "./customer-form";
import { Customer } from "@/types/customer";

interface AddCustomerDialogProps {
  customer?: Customer | null;
  onClose?: () => void;
}

export default function AddCustomerDialog({
  customer,
  onClose,
}: AddCustomerDialogProps) {
  const [open, setOpen] = useState(false);

  // Open dialog automatically for Edit
  useEffect(() => {
    if (customer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
  }, [customer]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Add Customer Button */}
      {!customer && (
        <Button
          onClick={handleOpen}
          className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Customer
        </Button>
      )}

      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="flex max-h-[90vh] w-full max-w-xl flex-col rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                {customer ? "Edit Customer" : "Add Customer"}
              </h2>

              <Button
                variant="ghost"
                type="button"
                onClick={handleClose}
                className="cursor-pointer text-slate-400 hover:text-white"
              >
                ✕
              </Button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <CustomerForm customer={customer} onClose={handleClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
