import { ArrowLeft, CalendarIcon, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

import { useUserSession } from "@/providers/session-provider";
import { PLAN_FEATURES, SubscriptionTier } from "@/lib/subscriptions";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface HeaderSectionProps {
  score?: number;
  role?: string;
  company?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  formattedDate: string;
}

export const HeaderSection = ({
  score = 0,
  role = "",
  company = "",
  isLoading = false,
  isDisabled = false,
  formattedDate = "",
}: HeaderSectionProps) => {
  const session = useUserSession();

  const rawTier = session?.user?.tier || "free";
  const userTier = rawTier as SubscriptionTier;
  const canGenerate = PLAN_FEATURES[userTier].canGenerateResume;

  return (
    <div className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-6 md:mb-10 md:flex-row md:items-end md:justify-between md:pb-8">
      <div className="flex flex-col items-start">
        <Link
          href="/home"
          className="mb-3 inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Start New Analysis
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
          AI Resume Insights
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600 sm:text-base">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-60 bg-slate-200" />
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500" /> Analysed for:
              </span>
              <span className="font-semibold text-slate-900">{role}</span>
              <span className="text-slate-500">at</span>
              <span className="font-semibold text-slate-900">{company}</span>
            </>
          )}
        </div>

        {!formattedDate && isLoading ? (
          <Skeleton className="h-4 w-50 bg-slate-200 mt-2" />
        ) : (
          <div className="flex items-center text-sm font-medium text-slate-500 mt-2">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            Analyzed on {formattedDate}
          </div>
        )}
      </div>

      {isLoading ? (
        <Skeleton className="h-12 w-full md:w-64 shrink-0 rounded-xl bg-slate-200" />
      ) : canGenerate ? (
        <Button
          type="button"
          className="h-12 w-full shrink-0 rounded-xl bg-slate-950 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-slate-800 md:w-auto"
        >
          Generate Updated Resume
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => alert("Open your Pricing Modal here!")}
          className="group relative h-12 w-full shrink-0 overflow-hidden rounded-xl border border-slate-700 bg-linear-to-b from-slate-800 to-slate-950 px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(15,23,42,0.2)] transition-all hover:scale-[1.02] hover:border-slate-600 hover:shadow-[0_4px_25px_rgba(15,23,42,0.4)] md:w-auto"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500 transition-transform duration-300 group-hover:rotate-12" />
            Unlock Resume Generator
          </span>
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </Button>
      )}
    </div>
  );
};
