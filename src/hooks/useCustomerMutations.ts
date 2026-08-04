import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { customerService } from "@/services/customer.service";
import { Customer, CustomerStatus } from "@/types/customer";

export function useAddCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customer: Customer) => customerService.addCustomer(customer),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer added successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add customer.");
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customer: Customer) =>
      customerService.updateCustomer(customer),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update customer.");
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerService.deleteCustomer(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer deleted successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete customer.");
    },
  });
}

export function useBulkDeleteCustomers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => customerService.bulkDeleteCustomers(ids),
    onSuccess: async (_data, ids) => {
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success(
        `${ids.length} customer${ids.length === 1 ? "" : "s"} deleted.`,
      );
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete selected customers.");
    },
  });
}

export function useBulkUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: CustomerStatus }) =>
      customerService.bulkUpdateStatus(ids, status),
    onSuccess: async (_data, { ids, status }) => {
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success(
        `${ids.length} customer${ids.length === 1 ? "" : "s"} marked ${status}.`,
      );
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update selected customers.");
    },
  });
}
