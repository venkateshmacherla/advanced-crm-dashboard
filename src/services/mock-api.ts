import { customers } from "@/data/customers";
import { Customer } from "@/types/customer";

const STORAGE_KEY = "crm-customers";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getStoredCustomers(): Customer[] {
  if (typeof window === "undefined") {
    return [...customers];
  }

  const storedCustomers = localStorage.getItem(STORAGE_KEY);

  if (!storedCustomers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    return [...customers];
  }

  return JSON.parse(storedCustomers);
}

function saveCustomers(customerList: Customer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customerList));
}

export async function getCustomers(): Promise<Customer[]> {
  await delay(300);

  return getStoredCustomers();
}

export async function addCustomer(customer: Customer): Promise<Customer> {
  await delay(300);

  const customerList = getStoredCustomers();

  customerList.unshift(customer);

  saveCustomers(customerList);

  return customer;
}

export async function updateCustomer(customer: Customer): Promise<Customer> {
  await delay(300);

  const customerList = getStoredCustomers().map((item) =>
    item.id === customer.id ? customer : item,
  );

  saveCustomers(customerList);

  return customer;
}

export async function deleteCustomer(id: string): Promise<void> {
  await delay(300);

  const customerList = getStoredCustomers().filter(
    (customer) => customer.id !== id,
  );

  saveCustomers(customerList);
}

export function resetCustomers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}
