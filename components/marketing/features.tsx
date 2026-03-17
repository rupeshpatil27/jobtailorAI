"use client";

import { FEATURES } from "@/constants";
import { FadeUpBox } from "../animated-wrapper";

export const Features = () => {
  return (
    <section className="relative py-24 px-6 lg:px-8 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FadeUpBox key={index} delay={index * 0.1}>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 hover:bg-slate-100 transition-colors shadow-sm">
                <div className="mb-6 inline-flex rounded-2xl bg-white p-4 border border-slate-200 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeUpBox>
          ))}
        </div>
      </div>
    </section>
  );
};
