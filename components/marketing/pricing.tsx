"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PRICING_PLANS } from "@/constants";
import { FadeUpBox } from "../animated-wrapper";

export const Pricing = () => {
  return (
    <section className="relative py-32 px-6 lg:px-8 bg-slate-50">
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-lg text-slate-600">
          Start optimizing immediately. Upgrade when you are ready to scale your
          search.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {PRICING_PLANS.map((plan, index) => (
          <FadeUpBox key={index} delay={index * 0.2}>
            <div
              className={`relative flex flex-col rounded-3xl p-8 ${
                plan.popular
                  ? "border-2 border-blue-500 bg-white shadow-xl shadow-blue-900/5"
                  : "border border-slate-200 bg-white shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-md">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {plan.tier}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-500 font-medium">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  {plan.description}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2
                      className={`h-5 w-5 ${plan.popular ? "text-blue-600" : "text-slate-400"}`}
                    />
                    <span className="text-slate-700 font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`flex h-12 w-full items-center justify-center rounded-xl font-bold transition-all ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          </FadeUpBox>
        ))}
      </div>
    </section>
  );
};
