import CustomerPageHeader from "@/components/customer/customer-page-header";
import CustomerStats from "@/components/customer/customer-stats";
import CustomerToolbar from "@/components/customer/customer-toolbar";

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <CustomerPageHeader />

      <CustomerStats />

      <CustomerToolbar />
    </div>
  );
}
