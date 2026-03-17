"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, XCircle, CheckCircle2, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const [isPending, startTransition] = useTransition();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const hasAttempted = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("This verification link is invalid or missing.");
      return;
    }
    if (hasAttempted.current) return;
    hasAttempted.current = true;

    const verifyToken = async () => {
      try {
        const res = await authClient.verifyEmail({ query: { token } });

        if (res.error) {
          setStatus("error");
          const apiMessage = res.error.message || "";
          if (apiMessage.toLowerCase().includes("already verified")) {
            setErrorMessage(
              "Your email is already verified! You can log in now.",
            );
          } else {
            setErrorMessage(
              "This verification link has expired or is invalid.",
            );
          }
        } else {
          setStatus("success");

          startTransition(() => {
            router.push("/home");
            router.refresh();
          });
        }
      } catch (error) {
        setStatus("error");
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="flex w-full flex-col py-[5vh] lg:py-[5vh] px-8 sm:px-16 lg:w-1/2 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:max-w-md text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative min-h-75 flex items-center justify-center">
          <div
            className={`absolute inset-0 flex flex-col items-center transition-all duration-700 ease-in-out ${
              status === "loading"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="mb-8 relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 ring-8 ring-blue-50/50">
              <Mail className="h-10 w-10 text-blue-600 animate-pulse" />
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Verifying your email
            </h1>
            <p className="text-sm text-slate-500">
              Please wait a moment while we securely authenticate...
            </p>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center transition-all duration-700 delay-150 ease-in-out ${
              status === "success"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50/50">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Email Verified!
            </h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span>Preparing your dashboard...</span>
                </>
              ) : (
                <span>Redirecting...</span>
              )}
            </div>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center transition-all duration-700 ease-in-out ${
              status === "error"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/50">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Verification Failed
            </h1>
            <p className="mb-8 text-sm text-slate-500">{errorMessage}</p>
            <Link href="/login" className="w-full">
              <Button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all active:scale-95">
                Go to Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
