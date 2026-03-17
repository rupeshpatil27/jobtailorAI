"use client";

import { useState } from "react";
import { X, Sparkles, FileText, Zap, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    document.cookie =
      "has_seen_jobtailor_welcome=true; max-age=31536000; path=/";
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Blurred Dark Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        {/* Top Accent Line */}
        <div className="h-2 w-full bg-linear-to-r from-blue-600 to-indigo-600" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Sparkles className="h-6 w-6" />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            Welcome to JobTailor Beta
          </h2>
          <p className="mb-8 text-sm text-slate-500 leading-relaxed">
            Stop guessing what recruiters want. Before you optimize your resume,
            here is a quick guide to our current release:
          </p>

          <div className="space-y-4">
            {/* Feature 1: What it is & How to use */}
            <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  How to use JobTailor
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  We analyze your resume against job descriptions to help you
                  beat the ATS. Simply upload your PDF, paste the job
                  description, and hit Analyze.
                </p>
              </div>
            </div>

            {/* Feature 2: The Limit */}
            <div className="flex gap-4 rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
              <Zap className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <h4 className="text-sm font-bold text-amber-900">
                  1 Free Scan Limit
                </h4>
                <p className="mt-1 text-xs text-amber-700/80">
                  Because our AI performs a deep, high-quality analysis,
                  verified accounts are strictly limited to{" "}
                  <strong>1 free scan</strong>. Make it count on your target
                  role!
                </p>
              </div>
            </div>

            {/* Feature 3: Beta Warning */}
            <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Work in Progress
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Some advanced Pro features are still being built. Please stick
                  to the free version while we polish the rest of the platform.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleClose}
            className="mt-8 h-12 w-full rounded-xl bg-slate-900 text-base font-bold text-white hover:bg-slate-800 transition-all active:scale-95"
          >
            I Understand, Let's Go
          </Button>
        </div>
      </div>
    </div>
  );
};
