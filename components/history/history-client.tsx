"use client";

import { useEffect, useState } from "react";
import { Target, Loader2 } from "lucide-react";
import { Variants } from "motion/react";

import { useInView } from "react-intersection-observer";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetHistory } from "@/features/history/api/use-get-history";

import { ScanRecord } from "@/types";

import { Button } from "@/components/ui/button";
import { HistorySkeleton } from "./history-skeleton";
import { HistoryToolbar } from "./history-toolbar";
import { HistoryCard } from "./history-card";

type FilterType = "All" | "High" | "Medium" | "Low";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const HistoryClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const {
    data,
    isFetching,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetHistory({
    search: debouncedSearch,
    filter: activeFilter,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <HistorySkeleton />;
  if (isError)
    return (
      <div className="text-rose-500 text-center py-10">
        Failed to load history. Please try again.
      </div>
    );

  const scans: ScanRecord[] = data?.pages.flatMap((page) => page.scans) || [];

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="w-full flex-1">
          <HistoryToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>

        <div className="h-10 flex items-center justify-end sm:w-32 shrink-0">
          {isFetching && !isFetchingNextPage && !isLoading && (
            <div className="flex items-center text-sm font-medium text-slate-400 animate-pulse">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </div>
          )}
        </div>
      </div>

      {scans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
          <Target className="h-10 w-10 text-slate-300 mb-3" />
          <h3 className="text-lg font-semibold text-slate-900">
            No scans found
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            We couldn't find any resume scans matching your current search or
            filters.
          </p>
          <Button
            variant="outline"
            className="mt-4 rounded-xl"
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("All");
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {scans.map((scan) => (
            <HistoryCard key={scan.id} scan={scan} />
          ))}
        </div>
      )}

      <div ref={ref} className="flex justify-center pt-6 pb-10 w-full">
        {isFetchingNextPage && (
          <div className="flex items-center text-slate-500 text-sm font-medium">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-blue-600" />
            Loading more scans...
          </div>
        )}
      </div>
    </div>
  );
};
