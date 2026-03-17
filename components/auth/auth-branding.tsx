import { Sparkles, Rocket } from "lucide-react";

interface AuthBrandingProps {
  mode: "login" | "register";
}

export const AuthBranding = ({ mode }: AuthBrandingProps) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-slate-900 items-center justify-center overflow-hidden sticky top-0 h-screen">
      <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-indigo-900/40 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-start max-w-lg px-12 animate-in fade-in slide-in-from-right-8 duration-1000">
        <div className="mb-6 flex items-center justify-center rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 shadow-2xl">
          {mode === "register" ? (
            <Sparkles className="h-8 w-8 text-blue-400" />
          ) : (
            <Rocket className="h-8 w-8 text-indigo-400" />
          )}
        </div>

        <h2 className="text-4xl font-bold text-white leading-tight mb-6">
          {mode === "register"
            ? "Beat the ATS and land your dream role."
            : "Welcome back to your workspace."}
        </h2>

        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
          {mode === "register"
            ? "JobTailor analyzes your resume against job descriptions in real-time. Join thousands of developers who have optimized their way to the interview stage."
            : "Pick up right where you left off. Access your previous Match Reports, saved resumes, and targeted keywords instantly."}
        </p>

        <div className="flex items-center gap-4 border-t border-white/10 pt-8 w-full">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 border border-white/20 shadow-inner"></div>
          <div>
            <p className="text-sm font-semibold text-white">Built by RP Tech</p>
            <p className="text-xs text-slate-400">Next-Generation AI Tools</p>
          </div>
        </div>
      </div>
    </div>
  );
};
