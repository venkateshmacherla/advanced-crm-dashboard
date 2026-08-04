import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { customerService } from "@/services/customer.service";
import { Customer } from "@/types/customer";

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
