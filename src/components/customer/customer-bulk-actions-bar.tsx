"use client";

import { Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  useBulkDeleteCustomers,
  useBulkUpdateStatus,
} from "@/hooks/useCustomerMutations";

interface CustomerBulkActionsBarProps {
  selectedCount: number;
  selectedIds: string[];
  onClearSelection: () => void;
}

export default function CustomerBulkActionsBar({
  selectedCount,
  selectedIds,
  onClearSelection,
}: CustomerBulkActionsBarProps) {
  const bulkUpdateStatus = useBulkUpdateStatus();
  const bulkDelete = useBulkDeleteCustomers();

  const isBusy = bulkUpdateStatus.isPending || bulkDelete.isPending;

  if (selectedCount === 0) {
    return null;
  }

  const handleMarkStatus = (status: "Active" | "Inactive") => {
    bulkUpdateStatus.mutate(
      { ids: selectedIds, status },
      { onSuccess: onClearSelection },
    );
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete ${selectedCount} selected customer${selectedCount === 1 ? "" : "s"}? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    bulkDelete.mutate(selectedIds, { onSuccess: onClearSelection });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-800 bg-blue-950/40 px-5 py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClearSelection}
          className="cursor-pointer text-slate-400 hover:text-white"
          aria-label="Clear selection"
        >
          <X size={18} />
        </button>

        <span className="text-sm font-medium text-white">
          {selectedCount} selected
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isBusy}
          onClick={() => handleMarkStatus("Active")}
          className="cursor-pointer border-green-700 bg-slate-900 text-green-400 hover:bg-green-950"
        >
          Mark Active
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isBusy}
          onClick={() => handleMarkStatus("Inactive")}
          className="cursor-pointer border-slate-600 bg-slate-900 text-slate-300 hover:bg-slate-800"
        >
          Mark Inactive
        </Button>

        <Button
          type="button"
          variant="destructive"
          size="sm"
          disabled={isBusy}
          onClick={handleDelete}
          className="cursor-pointer"
        >
          <Trash2 size={14} className="mr-1" />
          Delete Selected
        </Button>
      </div>
    </div>
  );
}
