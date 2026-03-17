import { Suspense } from "react";
import { AnalyzeResultContent } from "@/components/analyze-result/analyze-result-content";

const AnalyzeResultPage = async () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </div>
      }
    >
      <div className="mx-auto w-full md:max-w-7xl py-10 px-6">
        <AnalyzeResultContent />
      </div>
    </Suspense>
  );
};

export default AnalyzeResultPage;
