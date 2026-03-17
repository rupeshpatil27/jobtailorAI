"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Application Error Caught by Boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 mb-6 shadow-sm ring-8 ring-rose-50">
        <AlertTriangle className="h-10 w-10 text-rose-600" />
      </div>

      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
        Something went wrong!
      </h2>

      <p className="text-base text-slate-500 max-w-md mb-8">
        We encountered an unexpected issue while processing your request. Don't
        worry, your data is safe. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Button
          onClick={() => reset()}
          className="rounded-xl bg-slate-900 px-6 h-11 font-semibold text-white hover:bg-slate-800 w-full sm:w-auto"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>

        <Link href="/home" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="rounded-xl px-6 h-11 font-semibold w-full sm:w-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
