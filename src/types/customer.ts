export type CustomerStatus = "Active" | "Inactive";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  lastContact: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
