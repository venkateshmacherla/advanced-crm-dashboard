import { SavedFilter } from "@/types/filter";

const SAVED_FILTERS_KEY = "crm-saved-filters";

function daysAgo(days: number): string {
  const date = new Date();

  date.setDate(date.getDate() - days);

  return date.toISOString().split("T")[0];
}

const presetFilters: SavedFilter[] = [
  {
    id: "preset-active-customers",
    name: "Active Customers",
    isPreset: true,
    filters: {
      status: ["Active"],
      companies: [],
      dateFrom: "",
      dateTo: "",
      phone: "",
      email: "",
    },
  },
  {
    id: "preset-recent-contacts",
    name: "Recent Contacts",
    isPreset: true,
    filters: {
      status: [],
      companies: [],
      dateFrom: daysAgo(30),
      dateTo: daysAgo(0),
      phone: "",
      email: "",
    },
  },
  {
    id: "preset-inactive-leads",
    name: "Inactive Leads",
    isPreset: true,
    filters: {
      status: ["Inactive"],
      companies: [],
      dateFrom: "",
      dateTo: "",
      phone: "",
      email: "",
    },
  },
];

export function getSavedFilters(): SavedFilter[] {
  if (typeof window === "undefined") {
    return presetFilters;
  }

  const stored = localStorage.getItem(SAVED_FILTERS_KEY);

  if (!stored) {
    localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(presetFilters));
    return presetFilters;
  }

  try {
    return JSON.parse(stored) as SavedFilter[];
  } catch {
    return presetFilters;
  }
}

function persist(filters: SavedFilter[]) {
  localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(filters));
}

export function addSavedFilter(filter: SavedFilter): SavedFilter[] {
  const current = getSavedFilters();
  const updated = [...current, filter];

  persist(updated);

  return updated;
}

export function deleteSavedFilter(id: string): SavedFilter[] {
  const current = getSavedFilters();
  const updated = current.filter((filter) => filter.id !== id);

  persist(updated);

  return updated;
}

export function reorderSavedFilters(
  orderedFilters: SavedFilter[],
): SavedFilter[] {
  persist(orderedFilters);

  return orderedFilters;
}
