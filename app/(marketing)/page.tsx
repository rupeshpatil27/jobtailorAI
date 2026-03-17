import dynamic from "next/dynamic";
import { Metadata } from "next";
import { MarketingNavBar } from "@/components/marketing/nav-bar";
import { Hero } from "@/components/marketing/hero";
import { Footer } from "@/components/marketing/footer";
import { cookies } from "next/headers";
import { WelcomeModal } from "@/components/marketing/welcome-modal";

const Features = dynamic(
  () => import("@/components/marketing/features").then((mod) => mod.Features),
  {
    ssr: true,
  },
);

const Pricing = dynamic(
  () => import("@/components/marketing/pricing").then((mod) => mod.Pricing),
  {
    ssr: true,
  },
);

export const metadata: Metadata = {
  title: "AI Resume Insights | Land Your Dream Job",
  description:
    "Get instant, actionable feedback on your resume using AI. Optimize for ATS systems and generate personalized outreach templates.",
  openGraph: {
    title: "AI Resume Insights",
    description: "Optimize your resume for ATS systems in seconds.",
    type: "website",
  },
};

export default async function MarketingPage() {
  const cookieStore = await cookies();
  const hasSeenModal =
    cookieStore.get("has_seen_jobtailor_welcome")?.value === "true";
  return (
    <div className="flex min-h-screen flex-col w-full md:mx-auto">
      <MarketingNavBar />
      {!hasSeenModal && <WelcomeModal />}
      <main className="flex flex-1 flex-col w-full">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
