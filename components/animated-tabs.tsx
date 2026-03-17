"use client";

import { motion } from "motion/react";

interface TabItem {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: readonly TabItem[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const AnimatedTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: AnimatedTabsProps) => {
  return (
    <div className="flex w-full space-x-1 rounded-2xl bg-slate-100/80 p-1 md:w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative flex-1 px-3 py-3 text-xs font-semibold transition-colors duration-200 sm:text-sm md:flex-none md:px-5 md:py-2.5 ${
            activeTab === tab.id
              ? "text-slate-900"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="relative z-10 block w-full text-center">
            {tab.label}
          </span>

          {activeTab === tab.id && (
            <motion.div
              layoutId="premiumTabBubble"
              className="absolute inset-0 z-0 rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
