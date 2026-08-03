"use client";

import { useEffect, useMemo, useState } from "react";

import CustomerPageHeader from "@/components/customer/customer-page-header";
import CustomerStats from "@/components/customer/customer-stats";
import CustomerTable from "@/components/customer/customer-table";
import CustomerToolbar from "@/components/customer/customer-toolbar";
import CustomerPagination from "@/components/customer/customer-pagination";
import AddCustomerDialog from "@/components/customer/add-customer-dialog";

import { useCustomers } from "@/hooks/useCustomers";
import { Customer } from "@/types/customer";
import { toast } from "sonner";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 5;

  const { data: customers = [], isLoading } = useCustomers();

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive",
  ).length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const newThisMonth = customers.filter((customer) => {
    const createdDate = new Date(customer.createdAt);

    return (
      createdDate.getMonth() === currentMonth &&
      createdDate.getFullYear() === currentYear
    );
  }).length;

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    // Search
    if (search.trim()) {
      const keyword = search.toLowerCase().trim();

      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(keyword) ||
          customer.email.toLowerCase().includes(keyword) ||
          customer.company.toLowerCase().includes(keyword),
      );
    }

    // Status
    if (status !== "all") {
      result = result.filter(
        (customer) => customer.status.toLowerCase() === status.toLowerCase(),
      );
    }

    // Sort
    switch (sortBy) {
      case "company":
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;

      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.lastContact).getTime() -
            new Date(a.lastContact).getTime(),
        );
        break;

      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [customers, search, status, sortBy]);

  // Reset page when search/filter/sort changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [search, status, sortBy]);

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const startIndex = (currentPage - 1) * customersPerPage;

  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + customersPerPage,
  );

  const handleExport = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Company",
      "Status",
      "Last Contact",
    ];

    const rows = filteredCustomers.map((customer) => [
      customer.name,
      customer.email,
      customer.phone,
      customer.company,
      customer.status,
      customer.lastContact,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "customers.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    toast.success("Customers exported successfully!");
  };

  return (
    <div className="space-y-8">
      <CustomerPageHeader />

      <CustomerStats
        total={totalCustomers}
        active={activeCustomers}
        inactive={inactiveCustomers}
        newThisMonth={newThisMonth}
      />

      <CustomerToolbar
        search={search}
        status={status}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSortChange={setSortBy}
        onExport={handleExport}
      />

      <CustomerTable
        customers={paginatedCustomers}
        isLoading={isLoading}
        onEdit={setSelectedCustomer}
      />

      <CustomerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedCustomer && (
        <AddCustomerDialog
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}
