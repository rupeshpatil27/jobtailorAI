"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterType } from "@/types";

interface HistoryToolbarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeFilter: FilterType;
  setActiveFilter: (val: FilterType) => void;
}

const FILTERS: FilterType[] = ["All", "High", "Medium", "Low"];

export const HistoryToolbar = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
}: HistoryToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:w-[320px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search roles or companies..."
          className="pl-9 rounded-xl border-slate-200 bg-white shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === filter
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};
