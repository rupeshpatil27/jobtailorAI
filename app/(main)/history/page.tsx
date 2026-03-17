import { HistoryClient } from "@/components/history/history-client";
import { Suspense } from "react";

export const metadata = {
  title: "Scan History | JobTailor AI",
  description: "View your past resume ATS scans and optimization reports.",
};

const HistoryPage = async () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </div>
      }
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-10 md:py-10 animate-in fade-in duration-700">
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Scan History
          </h1>
          <p className="text-base text-slate-500 max-w-2xl">
            Review your past resume analyses. Track your ATS performance over
            time and revisit specific job tailored reports.
          </p>
        </div>
        <HistoryClient />
      </div>
    </Suspense>
  );
};

export default HistoryPage;
