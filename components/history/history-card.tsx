"use client";

import { memo } from "react";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { Building, Calendar, ChevronRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ScanRecord } from "@/types";
import { ProgressRing } from "./progress-ring";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 },
  },
};

const getScoreData = (score: number) => {
  if (score >= 80)
    return {
      color: "text-emerald-700 bg-emerald-50 ring-emerald-200",
      label: "High",
      stroke: "stroke-emerald-500",
    };
  if (score >= 60)
    return {
      color: "text-amber-700 bg-amber-50 ring-amber-200",
      label: "Medium",
      stroke: "stroke-amber-500",
    };
  return {
    color: "text-rose-700 bg-rose-50 ring-rose-200",
    label: "Low",
    stroke: "stroke-rose-500",
  };
};

const HistoryCardBase = ({ scan }: { scan: ScanRecord }) => {
  const scoreData = getScoreData(scan.overallScore);

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "50px" }}
    >
      <Card className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4 transition-all duration-300 hover:shadow-md hover:border-blue-200 bg-white">
        <div className="flex items-center gap-4 w-full">
          <ProgressRing
            score={scan.overallScore}
            colorClass={scoreData.stroke}
          />
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-slate-900 line-clamp-1">
              {scan.targetRole}
            </h3>
            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
              <span className="flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5" />
                {scan.targetCompany}
              </span>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(scan.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
          <Badge
            variant="outline"
            className={`px-2.5 py-1 text-xs border-0 ring-1 ring-inset ${scoreData.color}`}
          >
            {scoreData.label} Match
          </Badge>
          <Link href={`/analyze-result/${scan.id}`}>
            <Button
              variant="ghost"
              className="rounded-xl font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              View Report{" "}
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export const HistoryCard = memo(HistoryCardBase);
