import { CustomerStatus } from "./customer";

export interface CustomerFilters {
  status: CustomerStatus[];
  companies: string[];
  dateFrom: string;
  dateTo: string;
  phone: string;
  email: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  filters: CustomerFilters;
  isPreset?: boolean;
}

export const defaultFilters: CustomerFilters = {
  status: [],
  companies: [],
  dateFrom: "",
  dateTo: "",
  phone: "",
  email: "",
};

export function countActiveFilters(filters: CustomerFilters): number {
  let count = 0;

  if (filters.status.length > 0) count++;
  if (filters.companies.length > 0) count++;
  if (filters.dateFrom || filters.dateTo) count++;
  if (filters.phone.trim()) count++;
  if (filters.email.trim()) count++;

  return count;
}

export function isFiltersEmpty(filters: CustomerFilters): boolean {
  return countActiveFilters(filters) === 0;
}
