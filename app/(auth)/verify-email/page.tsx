"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function VerifyEmailInstructionPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    setMounted(true);
  }, []);

  const handleResend = async () => {
    if (!email) {
      toast.error("No email found. Please try logging in again.");
      return;
    }

    setIsResending(true);

    const { error } = await authClient.sendVerificationEmail({
      email: email,
      callbackURL: "/home",
    });

    setIsResending(false);

    if (error) {
      if (error.status === 429) {
        toast.error(
          "Too many requests. Please wait a while before trying again.",
        );
      } else {
        toast.error(
          error.message || "Failed to resend email. Please try again.",
        );
      }
    } else {
      toast.success("A fresh verification link has been sent to your inbox!");
    }
  };

  if (!mounted) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-6">
        <div className="flex flex-col items-center animate-pulse">
          <div className="mb-6 h-24 w-24 rounded-full bg-slate-200" />
          <div className="mb-3 h-8 w-48 rounded-md bg-slate-200" />
          <div className="mb-8 h-4 w-64 rounded-md bg-slate-200" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-6">
      <div className="mx-auto w-full max-w-md text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-6 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 ring-8 ring-blue-50/50">
          <Mail className="h-12 w-12 text-blue-600" />
          <div className="absolute ml-14 mt-14 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900">
          Check your email
        </h1>

        <p className="mb-8 text-base text-slate-500">
          We sent a secure verification link to <br />
          {email ? (
            <span className="font-semibold text-slate-900">{email}</span>
          ) : (
            <span className="font-semibold text-slate-900">
              your email address
            </span>
          )}
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleResend}
            disabled={isResending || !email}
            className="h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
          >
            {isResending ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            {isResending ? "Sending..." : "Resend Verification Email"}
          </Button>

          <Button
            variant="outline"
            disabled={isPending}
            className="h-12 w-full rounded-xl border-slate-200 hover:bg-slate-100 transition-all"
            onClick={() => {
              sessionStorage.removeItem("verificationEmail");
              startTransition(() => {
                router.push("/login");
              });
            }}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowLeft className="mr-2 h-4 w-4" />
            )}
            {isPending ? "Returning..." : "Back to Login"}
          </Button>
        </div>
      </div>
    </main>
  );
}
