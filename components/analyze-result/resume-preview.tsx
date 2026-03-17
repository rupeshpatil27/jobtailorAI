import { Skeleton } from "../ui/skeleton";
import { FadeUpBox } from "../animated-wrapper";

export const ResumePreview = ({ resumeUrl }: { resumeUrl: string }) => {
  return (
    <FadeUpBox delay={0.3}>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-100">
        <h2 className="text-lg font-bold text-slate-950 mb-5">
          Current Resume
        </h2>
        <div className="group relative aspect-[1/1.3] w-full overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-white flex items-center justify-center text-slate-400">
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              <img
                src={resumeUrl.replace(/\.pdf$/i, ".jpg")}
                alt="Resume Preview"
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                  Click to view full PDF
                </span>
              </div>
            </a>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center border-dashed border-slate-200 text-slate-400">
              <p className="text-sm font-medium">Your_Resume.pdf Preview</p>
            </div>
          )}
        </div>
      </div>
    </FadeUpBox>
  );
};

export const ResumePreviewSkeleton = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-100">
      <Skeleton className="h-6 w-40 mb-5 rounded bg-slate-200" />

      <Skeleton className="aspect-[1/1.3] w-full rounded-2xl bg-slate-200" />
    </div>
  );
};
