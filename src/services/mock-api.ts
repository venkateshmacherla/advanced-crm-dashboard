import { customers } from "@/data/customers";
import { Customer } from "@/types/customer";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let customerList = [...customers];

export async function getCustomers(): Promise<Customer[]> {
  await delay(500);

  return [...customerList];
}

export async function addCustomer(customer: Customer): Promise<Customer> {
  await delay(500);

  customerList.unshift(customer);

  return customer;
}

export async function updateCustomer(customer: Customer): Promise<Customer> {
  await delay(500);

  customerList = customerList.map((item) =>
    item.id === customer.id ? customer : item,
  );

  return customer;
}

export async function deleteCustomer(id: string): Promise<void> {
  await delay(500);

  customerList = customerList.filter((customer) => customer.id !== id);
}
