"use client";

import { motion, SVGMotionProps} from "motion/react";

interface ProgressRingProps {
  score: number;
  colorClass: string;
}

export const ProgressRing = ({ score, colorClass }: ProgressRingProps) => {
  const circleCircumference = 24 * 2 * Math.PI;
  const strokeOffset =
    circleCircumference - (score / 100) * circleCircumference;

  const animatedCircleProps: SVGMotionProps<SVGCircleElement> = {
    initial: { strokeDashoffset: circleCircumference },
    animate: { strokeDashoffset: strokeOffset },
    transition: { duration: 1.5, ease: "easeOut", delay: 0.2 },
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-50"
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
        <circle
          cx="28"
          cy="28"
          r="24"
          className="fill-none stroke-slate-200"
          strokeWidth="4"
        />
        <motion.circle
          cx="28"
          cy="28"
          r="24"
          className={`fill-none ${colorClass}`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circleCircumference}
          {...animatedCircleProps}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm font-bold text-slate-700"
      >
        {score}%
      </motion.span>
    </div>
  );
};
