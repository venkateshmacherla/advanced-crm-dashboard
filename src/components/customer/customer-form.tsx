"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { customerSchema, CustomerFormData } from "./customer-form-schema";
import { customerFormDefaults } from "./customer-form-defaults";

import { customerService } from "@/services/customer.service";
import { Customer } from "@/types/customer";

interface CustomerFormProps {
  onClose: () => void;
}

export default function CustomerForm({ onClose }: CustomerFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customerFormDefaults,
  });

  const onSubmit = async (data: CustomerFormData) => {
    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      status: data.status,
      notes: data.notes ?? "",
      lastContact: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await customerService.addCustomer(newCustomer);

      await queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      await queryClient.refetchQueries({
        queryKey: ["customers"],
      });

      alert("Customer added successfully!");

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add customer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Name
        </label>

        <Input {...register("name")} placeholder="Enter customer name" />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Email
        </label>

        <Input type="email" {...register("email")} placeholder="Enter email" />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Phone
        </label>

        <Input {...register("phone")} placeholder="Enter phone" />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Company
        </label>

        <Input {...register("company")} placeholder="Enter company" />

        {errors.company && (
          <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Status
        </label>

        <select
          {...register("status")}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {errors.status && (
          <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Notes
        </label>

        <Textarea
          rows={4}
          className="text-white"
          {...register("notes")}
          placeholder="Enter notes"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="cursor-pointer"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
        >
          Save Customer
        </Button>
      </div>
    </form>
  );
}
