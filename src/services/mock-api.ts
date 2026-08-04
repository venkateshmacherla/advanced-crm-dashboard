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

  const parsedCustomers: Customer[] = JSON.parse(storedCustomers);

  // Reset localStorage if mock data has more customers
  if (parsedCustomers.length < customers.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    return [...customers];
  }

  return parsedCustomers;
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

export async function bulkDeleteCustomers(ids: string[]): Promise<void> {
  await delay(300);

  const idSet = new Set(ids);
  const customerList = getStoredCustomers().filter(
    (customer) => !idSet.has(customer.id),
  );

  saveCustomers(customerList);
}

export async function bulkUpdateStatus(
  ids: string[],
  status: Customer["status"],
): Promise<void> {
  await delay(300);

  const idSet = new Set(ids);
  const customerList = getStoredCustomers().map((customer) =>
    idSet.has(customer.id)
      ? { ...customer, status, updatedAt: new Date().toISOString() }
      : customer,
  );

  saveCustomers(customerList);
}
