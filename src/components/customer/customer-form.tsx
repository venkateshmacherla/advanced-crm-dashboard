"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { customerSchema, CustomerFormData } from "./customer-form-schema";
import { customerFormDefaults } from "./customer-form-defaults";

import {
  useAddCustomer,
  useUpdateCustomer,
} from "@/hooks/useCustomerMutations";
import { Customer } from "@/types/customer";

interface CustomerFormProps {
  customer?: Customer | null;
  onClose: () => void;
}

export default function CustomerForm({ customer, onClose }: CustomerFormProps) {
  const addCustomer = useAddCustomer();
  const updateCustomer = useUpdateCustomer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customerFormDefaults,
  });

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        company: customer.company,
        status: customer.status,
        lastContact: customer.lastContact,
        notes: customer.notes,
      });
    } else {
      reset(customerFormDefaults);
    }
  }, [customer, reset]);

  const isBusy =
    isSubmitting || addCustomer.isPending || updateCustomer.isPending;

  const onSubmit = async (data: CustomerFormData) => {
    try {
      if (customer) {
        await updateCustomer.mutateAsync({
          ...customer,
          ...data,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await addCustomer.mutateAsync({
          id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          status: data.status,
          notes: data.notes ?? "",
          lastContact: data.lastContact,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      onClose();
    } catch {
      // Errors are already surfaced via toast in the mutation hooks.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Name *
        </label>

        <Input {...register("name")} placeholder="Enter customer name" />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Email *
        </label>

        <Input type="email" {...register("email")} placeholder="Enter email" />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Phone *
        </label>

        <Input
          {...register("phone")}
          type="tel"
          maxLength={10}
          inputMode="numeric"
          placeholder="Enter phone"
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
          }}
        />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Company *
        </label>

        <Input {...register("company")} placeholder="Enter company" />

        {errors.company && (
          <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Status
          </label>

          <select
            {...register("status")}
            className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Last Contact Date *
          </label>

          <Input
            type="date"
            {...register("lastContact")}
            className="text-white"
          />

          {errors.lastContact && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastContact.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Notes
        </label>

        <Textarea
          rows={4}
          {...register("notes")}
          placeholder="Enter notes"
          className="text-white"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer bg-grey-500"
          onClick={onClose}
          disabled={isBusy}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isBusy}
          className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy
            ? "Saving..."
            : customer
              ? "Update Customer"
              : "Save Customer"}
        </Button>
      </div>
    </form>
  );
}
