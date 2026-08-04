"use client";

import { useEffect, useState } from "react";
import { Star, Trash2, X, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CustomerFilters, defaultFilters, SavedFilter } from "@/types/filter";
import {
  getSavedFilters,
  addSavedFilter,
  deleteSavedFilter,
  reorderSavedFilters,
} from "@/lib/filter-storage";
import { CustomerStatus } from "@/types/customer";

interface FilterPanelProps {
  open: boolean;
  onClose: () => void;
  companies: string[];
  filters: CustomerFilters;
  onApply: (filters: CustomerFilters) => void;
}

function SavedFilterRow({
  savedFilter,
  onApply,
  onDelete,
}: {
  savedFilter: SavedFilter;
  onApply: (filters: CustomerFilters) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: savedFilter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950 px-2 py-2"
    >
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          className="cursor-grab touch-none text-slate-500 hover:text-slate-300 active:cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical size={16} />
        </button>

        <button
          type="button"
          onClick={() => onApply(savedFilter.filters)}
          className="cursor-pointer truncate text-sm text-slate-200 hover:text-blue-400"
        >
          {savedFilter.name}
        </button>

        {savedFilter.isPreset && (
          <Star
            size={14}
            className="shrink-0 fill-yellow-500 text-yellow-500"
          />
        )}
      </div>

      {!savedFilter.isPreset && (
        <button
          type="button"
          onClick={() => onDelete(savedFilter.id)}
          className="cursor-pointer text-slate-500 hover:text-red-500"
          aria-label={`Delete saved filter ${savedFilter.name}`}
        >
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}

export default function FilterPanel({
  open,
  onClose,
  companies,
  filters,
  onApply,
}: FilterPanelProps) {
  const [draft, setDraft] = useState<CustomerFilters>(filters);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [newFilterName, setNewFilterName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraft(filters);
      setSavedFilters(getSavedFilters());
    }
  }, [open, filters]);

  if (!open) {
    return null;
  }

  const toggleStatus = (status: CustomerStatus) => {
    setDraft((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((item) => item !== status)
        : [...prev.status, status],
    }));
  };

  const toggleCompany = (company: string) => {
    setDraft((prev) => ({
      ...prev,
      companies: prev.companies.includes(company)
        ? prev.companies.filter((item) => item !== company)
        : [...prev.companies, company],
    }));
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const handleClearAll = () => {
    setDraft(defaultFilters);
    onApply(defaultFilters);
  };

  const handleSaveFilter = () => {
    const name = newFilterName.trim();

    if (!name) {
      toast.error("Give your filter a name before saving.");
      return;
    }

    const updated = addSavedFilter({
      id: crypto.randomUUID(),
      name,
      filters: draft,
    });

    setSavedFilters(updated);
    setNewFilterName("");
    toast.success("Filter saved!");
  };

  const handleDeleteSavedFilter = (id: string) => {
    setSavedFilters(deleteSavedFilter(id));
  };

  const handleApplySavedFilter = (savedFilters: CustomerFilters) => {
    setDraft(savedFilters);
    onApply(savedFilters);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setSavedFilters((current) => {
      const oldIndex = current.findIndex((item) => item.id === active.id);
      const newIndex = current.findIndex((item) => item.id === over.id);
      const reordered = arrayMove(current, oldIndex, newIndex);

      reorderSavedFilters(reordered);

      return reordered;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60">
      <div className="flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="text-lg font-semibold text-white">Filters</h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-white"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-6 px-5 py-5">
          {/* Status */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-200">Status</h3>

              {draft.status.length > 0 && (
                <button
                  type="button"
                  className="cursor-pointer text-xs text-blue-400 hover:underline"
                  onClick={() => setDraft((prev) => ({ ...prev, status: [] }))}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-2">
              {(["Active", "Inactive"] as CustomerStatus[]).map((status) => (
                <label
                  key={status}
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-300"
                >
                  <input
                    type="checkbox"
                    checked={draft.status.includes(status)}
                    onChange={() => toggleStatus(status)}
                    className="h-4 w-4 cursor-pointer rounded border-slate-600 bg-slate-800 accent-blue-600"
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>

          {/* Company multi-select */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-200">Company</h3>

            <div className="max-h-32 space-y-2 overflow-y-auto rounded-md border border-slate-800 p-2">
              {companies.length === 0 && (
                <p className="text-xs text-slate-500">No companies yet.</p>
              )}

              {companies.map((company) => (
                <label
                  key={company}
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-300"
                >
                  <input
                    type="checkbox"
                    checked={draft.companies.includes(company)}
                    onChange={() => toggleCompany(company)}
                    className="h-4 w-4 cursor-pointer rounded border-slate-600 bg-slate-800 accent-blue-600"
                  />
                  {company}
                </label>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-200">
              Date Range (Last Contact)
            </h3>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-xs text-slate-400">
                  From
                </label>
                <Input
                  type="date"
                  value={draft.dateFrom}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, dateFrom: e.target.value }))
                  }
                  className="text-white"
                />
              </div>

              <div className="flex-1">
                <label className="mb-1 block text-xs text-slate-400">To</label>
                <Input
                  type="date"
                  value={draft.dateTo}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, dateTo: e.target.value }))
                  }
                  className="text-white"
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-200">
              Phone Number
            </h3>

            <Input
              value={draft.phone}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="e.g. 555"
              className="text-white"
            />
          </div>

          {/* Email */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-200">
              Email Contains
            </h3>

            <Input
              value={draft.email}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="e.g. @gmail.com"
              className="text-white"
            />
          </div>

          {/* Save filter */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-200">
              Save Current Filter
            </h3>

            <div className="flex gap-2">
              <Input
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
                placeholder="Filter name..."
                className="text-white"
              />

              <Button
                type="button"
                onClick={handleSaveFilter}
                className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </Button>
            </div>
          </div>

          {/* Saved filters (draggable) */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-slate-200">
              Saved Filters
            </h3>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={savedFilters.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {savedFilters.map((savedFilter) => (
                    <SavedFilterRow
                      key={savedFilter.id}
                      savedFilter={savedFilter}
                      onApply={handleApplySavedFilter}
                      onDelete={handleDeleteSavedFilter}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        <div className="flex gap-3 border-t border-slate-800 px-5 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClearAll}
            className="flex-1 cursor-pointer border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
          >
            Clear All
          </Button>

          <Button
            type="button"
            onClick={handleApply}
            className="flex-1 cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
