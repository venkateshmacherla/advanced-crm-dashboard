import { useQuery } from "@tanstack/react-query";

import { customerService } from "@/services/customer.service";
import { Customer } from "@/types/customer";

export function useCustomers() {
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
    staleTime: 60 * 1000,
  });
}
