"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export const MarketingNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full px-4 pt-4 md:px-8 md:pt-6 pointer-events-none">
      <nav
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl md:rounded-full border transition-all duration-300 ease-in-out pointer-events-auto ${
          isScrolled
            ? "border-slate-200 bg-white/90 px-6 py-3 shadow-md backdrop-blur-md md:px-8"
            : "border-transparent bg-transparent px-6 py-5 shadow-none md:px-8"
        }`}
      >
        <div
          className="animate-in fade-in slide-in-from-left-6 duration-700 fill-mode-both"
          style={{ animationDelay: "100ms" }}
        >
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              JobTailor
            </span>
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              AI
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="animate-in fade-in zoom-in-[0.8] duration-700 fill-mode-both"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Sign in
            </Link>
          </div>
          <div
            className="animate-in fade-in slide-in-from-right-6 duration-700 fill-mode-both"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              href="/signup"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
