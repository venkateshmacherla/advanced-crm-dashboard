"use client";

import { Button } from "@/components/ui/button";

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CustomerPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CustomerPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      <Button
        variant="outline"
        className="cursor-pointer bg-grey-300 "
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            size="sm"
            variant={currentPage === index + 1 ? "default" : "outline"}
            className="cursor-pointer bg-grey-300"
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        className="cursor-pointer bg-grey-300"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
