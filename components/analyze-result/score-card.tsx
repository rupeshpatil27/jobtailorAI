import { motion } from "motion/react";
import { Skeleton } from "../ui/skeleton";
import { FadeUpBox } from "../animated-wrapper";

interface ScoreCardProps {
  score: number;
  resumeOverview: string;
}

export const ScoreCard = ({ score, resumeOverview }: ScoreCardProps) => {
  const circumference = 339.29;
  const strokeOffset = circumference - (circumference * score) / 100;
  const strokeColor =
    score >= 80 ? "#22C55E" : score >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <FadeUpBox delay={0.1}>
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-100">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative flex items-center justify-center shrink-0">
            <svg
              className="w-44 h-44 transform -rotate-90"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="12"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={strokeColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: strokeOffset }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-6xl font-black tracking-tight text-slate-950">
                {score}
              </span>
              <span className="text-2xl font-bold text-slate-400">/100</span>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                ATS Match
              </p>
            </div>
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-950 mb-3">
              {score >= 80
                ? "Your resume is looking great!"
                : "We have some work to do."}
            </h2>
            <p className="text-slate-600 leading-relaxed">{resumeOverview}</p>
          </div>
        </div>
      </div>
    </FadeUpBox>
  );
};

export const ScoreCardSkeleton = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-100">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="shrink-0">
          <Skeleton className="h-44 w-44 rounded-full bg-slate-200" />
        </div>

        <div className="flex-1 w-full space-y-4">
          <Skeleton className="h-8 w-3/4 md:w-1/2 rounded-lg bg-slate-200 mx-auto md:mx-0" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded bg-slate-200" />
            <Skeleton className="h-4 w-11/12 md:w-5/6 rounded bg-slate-200 mx-auto md:mx-0" />
            <Skeleton className="h-4 w-4/5 md:w-2/3 rounded bg-slate-200 mx-auto md:mx-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
