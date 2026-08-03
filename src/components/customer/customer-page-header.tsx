import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CustomerPageHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Customers
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Manage your customers, contacts and activity.
        </p>
      </div>

      <Button className="gap-2 cursor-pointer">
        <Plus size={18} />
        Add Customer
      </Button>
    </div>
  );
}
