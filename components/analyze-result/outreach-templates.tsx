"use client";

import { useState } from "react";
import { Bot, CheckCircle, Copy } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedTabs } from "../animated-tabs";
import { FadeUpBox } from "../animated-wrapper";
import { Skeleton } from "../ui/skeleton";

interface OutreachTemplatesProps {
  emailTemplate: string;
  messageTemplate: string;
}

const TABS = [
  { id: "email", label: "Email" },
  { id: "message", label: "LinkedIn Message" },
];

export const OutreachTemplates = ({
  emailTemplate,
  messageTemplate,
}: OutreachTemplatesProps) => {
  const [activeTab, setActiveTab] = useState<string>("email");
  const [copied, setCopied] = useState(false);

  const activeText = activeTab === "email" ? emailTemplate : messageTemplate;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <FadeUpBox delay={0.6}>
      <div className="rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-100 overflow-hidden">
        <div className="border-b border-slate-100 px-8 pt-8 pb-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center size-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Bot className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-950">
              AI Outreach Templates
            </h2>
          </div>

          <AnimatedTabs
            tabs={TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="p-8 bg-slate-50 relative group">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-medium"
          >
            {activeText}
          </motion.p>

          <button
            onClick={() => copyToClipboard(activeText)}
            className={`absolute top-6 right-6 p-2.5 rounded-xl transition-all shadow-sm ${
              copied
                ? "bg-green-500 text-white"
                : "bg-white border border-slate-200 text-slate-500 group-hover:opacity-100 group-hover:scale-100 md:opacity-0 md:scale-95 hover:text-blue-600 hover:border-blue-200"
            }`}
            title="Copy to clipboard"
          >
            {copied ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </FadeUpBox>
  );
};

export const OutreachTemplatesSkeleton = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-100 overflow-hidden">
      <div className="border-b border-slate-100 px-8 pt-8 pb-2">
        <div className="flex items-center gap-3 mb-5">
          <Skeleton className="size-10 rounded-xl bg-slate-200 shrink-0" />
          <Skeleton className="h-6 w-48 rounded-lg bg-slate-200" />
        </div>

        <div className="flex gap-2 mb-2">
          <Skeleton className="h-9 w-20 rounded-lg bg-slate-200" />
          <Skeleton className="h-9 w-36 rounded-lg bg-slate-200" />
        </div>
      </div>

      <div className="p-8 bg-slate-50 relative">
        <Skeleton className="absolute top-6 right-6 h-9 w-9 rounded-xl bg-slate-200" />

        <div className="space-y-6 pr-12">
          <Skeleton className="h-4 w-1/3 rounded bg-slate-200" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-full rounded bg-slate-200" />
            <Skeleton className="h-4 w-full rounded bg-slate-200" />
            <Skeleton className="h-4 w-5/6 rounded bg-slate-200" />
          </div>

          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-16 rounded bg-slate-200" />
            <Skeleton className="h-4 w-24 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
