"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const targetUrl = callbackUrl ? (callbackUrl as string) : "/home";
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: targetUrl,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          startTransition(() => {
            router.push(targetUrl);
            router.refresh();
          });
        },
        onError: (ctx) => {
          setIsLoading(false);
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            sessionStorage.setItem("verificationEmail", values.email);
            startTransition(() => {
              router.push("/verify-email");
            });
            return;
          }
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const isSubmitting = isLoading || isPending;

  return (
    <div className="flex w-full flex-col py-[15vh] lg:py-[15vh] px-8 sm:px-16 lg:w-1/2 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8 flex flex-col space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 text-left"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        className="flex h-12 w-full rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 focus-visible:ring-1 focus-visible:ring-blue-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 m-0 w-full wrap-break-word" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-semibold text-slate-700">
                      Password
                    </FormLabel>
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="flex h-12 w-full rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 focus-visible:ring-1 focus-visible:ring-blue-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 m-0 w-full wrap-break-word" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>
                    {isPending ? "Redirecting..." : "Authenticating..."}
                  </span>
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
