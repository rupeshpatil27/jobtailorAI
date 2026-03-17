"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  UploadCloud,
  Building2,
  Briefcase,
  AlignLeft,
  Loader2,
  Sparkles,
} from "lucide-react";

import * as z from "zod";

import animationData from "../public/Scan.json";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="size-60 md:size-90 rounded-full bg-slate-100 animate-pulse" />
  ),
});

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateAnalyze } from "@/features/home/api/use-create-analyze";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

import { FileUploader } from "./file-uploader";

const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required." }),
  jobTitle: z.string().min(2, { message: "Job title is required." }),
  jobDescription: z
    .string()
    .min(20, { message: "Please paste more of the job description." }),
  resume: z
    .any()
    .refine((file) => file instanceof File, "Please upload your resume PDF."),
});

export const ResumeForm = () => {
  const router = useRouter();
  const mutation = useCreateAnalyze();
  const [isLoadingText, setisLoadingText] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      jobDescription: "",
      resume: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("companyName", values.companyName);
    formData.append("jobTitle", values.jobTitle);
    formData.append("jobDescription", values.jobDescription);

    if (values.resume) {
      formData.append("resume", values.resume);
    }

    mutation.mutate(
      {
        formData,
        onProgress: (message) => setisLoadingText(message),
      },
      {
        onSuccess: (data) => {
          setIsRedirecting(true);
          setisLoadingText("Success! Redirecting to your results...");
          router.push(`/analyze-result/${data.analysisId}`);
        },
      },
    );
  };

  const isLoading = mutation.isPending || isRedirecting;

  return (
    <section className="w-full space-y-5">
      <div className="relative flex flex-col items-center justify-center text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 mt-10 text-sm font-medium text-blue-600 shadow-sm animate-in duration-700">
          <Sparkles className="mr-2 h-4 w-4" />
          Powered by Google Gemini 1.5 AI
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl animate-in duration-500 mt-5">
          Start a New Scan. <br className="hidden sm:block" />
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Target Your Next Role.
          </span>
        </h1>

        {isLoading ? (
          <>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 md:text-xl leading-relaxed animate-in duration-700">
              {isLoadingText}
            </p>

            <Lottie
              animationData={animationData}
              className="size-60 md:size-90"
            />
          </>
        ) : (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 md:text-xl leading-relaxed animate-in duration-700">
            Stop guessing what recruiters want. Upload your resume, paste the
            job description, and let our AI uncover the exact keywords you need
            to land the interview.
          </p>
        )}
      </div>

      {!isLoading && (
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
          <div className="mb-8 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Target Your Resume
            </h2>
            <p className="text-slate-500 mt-1">
              Provide the job details and your current resume to get started.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in duration-700"
            >
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-slate-700">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                          <Input
                            type="text"
                            placeholder="e.g. Google, TechCorp..."
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
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-slate-700">
                        Job Title
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                          <Input
                            type="text"
                            placeholder="e.g. Frontend Developer"
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
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-slate-700">
                        Job Description
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <AlignLeft className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                          <Textarea
                            placeholder="Paste the full job description here..."
                            rows={6}                            
                            className="flex h-30 w-full rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 focus-visible:ring-1 focus-visible:ring-blue-500"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 m-0 w-full wrap-break-word" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col h-full justify-between space-y-8">
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem className="space-y-2 h-full flex flex-col">
                      <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        Upload Resume (PDF)
                      </FormLabel>

                      <FormControl>
                        <FileUploader
                          file={field.value}
                          setFile={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      Analyze Resume
                      <UploadCloud className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </section>
  );
};
