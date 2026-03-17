import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const HistorySkeleton = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full sm:w-75 rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 shadow-sm border-slate-100"
          >
            <div className="flex items-center gap-4 w-full">
              <Skeleton className="h-14 w-14 rounded-full shrink-0" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-5 w-3/4 sm:w-48" />
                <Skeleton className="h-4 w-1/2 sm:w-32" />
              </div>
            </div>
            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-28 rounded-xl" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
