import { CustomerFormData } from "./customer-form-schema";

export const customerFormDefaults: CustomerFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "Active",
  lastContact: new Date().toISOString().split("T")[0],
  notes: "",
};
