"use client";

import { useParams } from "next/navigation";
import { useGetAnalysis } from "@/features/analyze-result/api/use-get-analysis";

import { HeaderSection } from "@/components/analyze-result/header-section";
import {
  ScoreCard,
  ScoreCardSkeleton,
} from "@/components/analyze-result/score-card";
import {
  FeedbackBreakdown,
  FeedbackBreakdownSkeleton,
} from "@/components/analyze-result/feedback-breakdown";
import {
  OutreachTemplates,
  OutreachTemplatesSkeleton,
} from "@/components/analyze-result/outreach-templates";
import {
  ResumePreview,
  ResumePreviewSkeleton,
} from "@/components/analyze-result/resume-preview";

export const AnalyzeResultContent = () => {
  const params = useParams();
  const id = params.id as string;

  const analysisQuery = useGetAnalysis(id);
  const analysisData = analysisQuery.data;

  const formattedDate = analysisData?.createdAt
    ? new Date(analysisData.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  if (!id) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        <p className="text-lg font-semibold">
          No resume analysis found. Please upload a resume first.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700">
      <HeaderSection
        role={analysisData?.targetRole}
        company={analysisData?.targetCompany}
        score={analysisData?.overallScore}
        formattedDate={formattedDate}
        isLoading={analysisQuery.isLoading}
      />

      {analysisQuery.isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          <div className="lg:col-span-7 space-y-8">
            <ScoreCardSkeleton />
            <FeedbackBreakdownSkeleton />
            <div className="hidden lg:block">
              <OutreachTemplatesSkeleton />
            </div>
          </div>
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-10 h-fit z-10">
            <ResumePreviewSkeleton />
            <div className="block lg:hidden">
              <OutreachTemplatesSkeleton />
            </div>
          </div>
        </div>
      ) : analysisQuery.isError || !analysisData ? (
        <div className="py-20 text-center text-red-500">
          <p className="text-lg font-semibold">
            Failed to load analysis data. Please try again.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          <div className="lg:col-span-7 space-y-8">
            <ScoreCard
              score={analysisData.overallScore}
              resumeOverview={analysisData.resumeOverview}
            />
            <FeedbackBreakdown breakdown={analysisData.breakdown} />
            <div className="hidden lg:block">
              <OutreachTemplates
                emailTemplate={analysisData.emailTemplate}
                messageTemplate={analysisData.messageTemplate}
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-10 h-fit z-10">
            <div className="relative">
              <ResumePreview resumeUrl={analysisData.resumeUrl} />
            </div>

            <div className="block lg:hidden">
              <OutreachTemplates
                emailTemplate={analysisData.emailTemplate}
                messageTemplate={analysisData.messageTemplate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
