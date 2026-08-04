"use client";

import { useEffect, useMemo, useState } from "react";

import CustomerPageHeader from "@/components/customer/customer-page-header";
import CustomerStats from "@/components/customer/customer-stats";
import CustomerTable from "@/components/customer/customer-table";
import CustomerToolbar from "@/components/customer/customer-toolbar";
import CustomerPagination from "@/components/customer/customer-pagination";
import AddCustomerDialog from "@/components/customer/add-customer-dialog";
import FilterPanel from "@/components/customer/filter-panel";
import CustomerDetailDrawer from "@/components/customer/customer-detail-drawer";

import { useCustomers } from "@/hooks/useCustomers";
import { useDeleteCustomer } from "@/hooks/useCustomerMutations";
import { Customer } from "@/types/customer";
import {
  CustomerFilters,
  countActiveFilters,
  defaultFilters,
} from "@/types/filter";
import { toast } from "sonner";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filters, setFilters] = useState<CustomerFilters>(defaultFilters);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: customers = [], isLoading, isError, error } = useCustomers();
  const deleteCustomer = useDeleteCustomer();

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

  const companies = useMemo(() => {
    const unique = new Set(customers.map((customer) => customer.company));
    return Array.from(unique).sort();
  }, [customers]);

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

    // Status filter (multi-select)
    if (filters.status.length > 0) {
      result = result.filter((customer) =>
        filters.status.includes(customer.status),
      );
    }

    // Company filter (multi-select)
    if (filters.companies.length > 0) {
      result = result.filter((customer) =>
        filters.companies.includes(customer.company),
      );
    }

    // Date range filter (last contact)
    if (filters.dateFrom) {
      result = result.filter(
        (customer) => customer.lastContact >= filters.dateFrom,
      );
    }

    if (filters.dateTo) {
      result = result.filter(
        (customer) => customer.lastContact <= filters.dateTo,
      );
    }

    // Phone partial match
    if (filters.phone.trim()) {
      const phoneKeyword = filters.phone.trim();
      result = result.filter((customer) =>
        customer.phone.includes(phoneKeyword),
      );
    }

    // Email partial match
    if (filters.email.trim()) {
      const emailKeyword = filters.email.toLowerCase().trim();
      result = result.filter((customer) =>
        customer.email.toLowerCase().includes(emailKeyword),
      );
    }

    // Sort
    switch (sortBy) {
      case "company":
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;

      case "email":
        result.sort((a, b) => a.email.localeCompare(b.email));
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
  }, [customers, search, filters, sortBy]);

  // Reset page when search/filter/sort/pageSize changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [search, filters, sortBy, pageSize]);

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + pageSize,
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

  const handleDeleteFromDrawer = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmed) {
      return;
    }

    deleteCustomer.mutate(id);
    setViewingCustomer(null);
  };

  if (isError) {
    return (
      <div className="space-y-8">
        <CustomerPageHeader />

        <div className="rounded-xl border border-red-900 bg-red-950/40 p-8 text-center text-red-300">
          <p className="font-medium">Failed to load customers.</p>
          <p className="mt-1 text-sm text-red-400">
            {error instanceof Error ? error.message : "Please try again."}
          </p>
        </div>
      </div>
    );
  }

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
        sortBy={sortBy}
        activeFilterCount={countActiveFilters(filters)}
        onSearchChange={setSearch}
        onSortChange={setSortBy}
        onExport={handleExport}
        onOpenFilters={() => setIsFilterPanelOpen(true)}
      />

      <CustomerTable
        customers={paginatedCustomers}
        isLoading={isLoading}
        onEdit={setSelectedCustomer}
        onView={setViewingCustomer}
      />

      <CustomerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />

      {selectedCustomer && (
        <AddCustomerDialog
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {viewingCustomer && (
        <CustomerDetailDrawer
          customer={viewingCustomer}
          onClose={() => setViewingCustomer(null)}
          onEdit={(customer) => {
            setViewingCustomer(null);
            setSelectedCustomer(customer);
          }}
          onDelete={handleDeleteFromDrawer}
        />
      )}

      <FilterPanel
        open={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        companies={companies}
        filters={filters}
        onApply={setFilters}
      />
    </div>
  );
}
