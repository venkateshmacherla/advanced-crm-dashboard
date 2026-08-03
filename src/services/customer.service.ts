import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "./mock-api";

import { Customer } from "@/types/customer";

export const customerService = {
  getCustomers,

  addCustomer(customer: Customer) {
    return addCustomer(customer);
  },

  updateCustomer(customer: Customer) {
    return updateCustomer(customer);
  },

  deleteCustomer(id: string) {
    return deleteCustomer(id);
  },
};
