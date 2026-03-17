"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { VerifyEmail } from "@/components/auth/verify-email";

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-6">
      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center py-[10vh]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        }
      >
        <VerifyEmail />
      </Suspense>
    </main>
  );
}
