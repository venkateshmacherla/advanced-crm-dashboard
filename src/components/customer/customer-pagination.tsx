"use client";

import { Button } from "@/components/ui/button";

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function CustomerPagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: CustomerPaginationProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span>Rows per page:</span>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-9 cursor-pointer rounded-md border border-slate-700 bg-slate-900 px-2 text-sm text-slate-200 outline-none focus:border-blue-500"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {totalPages > 1 && (
        <>
          <Button
            variant="outline"
            className="cursor-pointer bg-grey-300"
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
        </>
      )}
    </div>
  );
}
