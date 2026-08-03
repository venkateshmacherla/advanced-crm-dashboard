"use client";

import { useMemo, useState } from "react";

import CustomerPageHeader from "@/components/customer/customer-page-header";
import CustomerStats from "@/components/customer/customer-stats";
import CustomerTable from "@/components/customer/customer-table";
import CustomerToolbar from "@/components/customer/customer-toolbar";

import { useCustomers } from "@/hooks/useCustomers";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const { data: customers = [], isLoading } = useCustomers();

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    // Search
    if (search.trim()) {
      const keyword = search.toLowerCase().trim();

      result = result.filter((customer) => {
        return (
          customer.name.toLowerCase().includes(keyword) ||
          customer.email.toLowerCase().includes(keyword) ||
          customer.company.toLowerCase().includes(keyword)
        );
      });
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

  return (
    <div className="space-y-8">
      <CustomerPageHeader />

      <CustomerStats />

      <CustomerToolbar
        search={search}
        status={status}
        sortBy={sortBy}
        onSearchChange={(value) => setSearch(value)}
        onStatusChange={(value) => setStatus(value)}
        onSortChange={(value) => setSortBy(value)}
      />

      <CustomerTable customers={filteredCustomers} isLoading={isLoading} />
    </div>
  );
}
