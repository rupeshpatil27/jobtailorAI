"use client";

import { CheckCircle, AlertTriangle } from "lucide-react";
import { BreakdownItem } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { FadeUpBox } from "../animated-wrapper";

interface FeedbackBreakdownProps {
  breakdown: BreakdownItem[];
}

export const FeedbackBreakdown = ({ breakdown }: FeedbackBreakdownProps) => {
  return (
    <div className="space-y-6">
      <FadeUpBox delay={0.6}>
        <h2 className="text-xl font-bold text-slate-950 pt-2">
          Detailed Breakdown
        </h2>
      </FadeUpBox>

      {breakdown.map((category, index) => (
        <FadeUpBox
          key={category.id}
          delay={index === 0 ? 0.8 : 0.15}
          viewportMargin="40px"
        >
          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-100/50 overflow-hidden">
            <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-500">{category.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`text-2xl font-black ${category.score >= 80 ? "text-green-600" : category.score >= 60 ? "text-amber-500" : "text-red-500"}`}
                >
                  {category.score}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Score
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* The Good (Pros) */}
              {category.good.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-green-600 uppercase tracking-widest mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1.5" /> What you did well
                  </h4>
                  <div className="space-y-3">
                    {category.good.map((text, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl border border-green-100 bg-green-50/50"
                      >
                        <p className="text-sm font-medium text-green-950 leading-relaxed">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* The Bad (Cons) */}
              {category.bad.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center mt-6">
                    <AlertTriangle className="h-4 w-4 mr-1.5" /> Areas to
                    improve
                  </h4>
                  <div className="space-y-3">
                    {category.bad.map((text, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl border border-red-100 bg-red-50/50"
                      >
                        <p className="text-sm font-medium text-red-950 leading-relaxed">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeUpBox>
      ))}
    </div>
  );
};

export const FeedbackBreakdownSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="pt-2">
        <Skeleton className="h-7 w-48 rounded-lg bg-slate-200" />
      </div>

      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-100/50 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-100">
            <div className="w-full">
              <Skeleton className="h-6 w-1/3 mb-2 rounded bg-slate-200" />
              <Skeleton className="h-4 w-2/3 rounded bg-slate-200" />
            </div>
            <div className="flex flex-col items-end shrink-0 pl-4">
              <Skeleton className="h-8 w-12 mb-1 rounded-md bg-slate-200" />
              <Skeleton className="h-3 w-10 rounded bg-slate-200" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <Skeleton className="h-4 w-40 mb-3 rounded bg-slate-200" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full rounded-xl bg-slate-200/60" />
              </div>
            </div>

            <div>
              <Skeleton className="h-4 w-40 mb-3 mt-6 rounded bg-slate-200" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full rounded-xl bg-slate-200/60" />
                <Skeleton className="h-16 w-full rounded-xl bg-slate-200/60" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
