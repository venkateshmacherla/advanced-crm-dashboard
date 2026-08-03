import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  company: z.string().min(2, "Company is required"),
  status: z.enum(["Active", "Inactive"]),
  notes: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
