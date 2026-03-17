import { Target, Mail, LineChart } from "lucide-react";
import React from "react";

// --- Types ---
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface PricingPlan {
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  href: string;
}

export const FEATURES: Feature[] = [
  {
    icon: React.createElement(Target, { className: "h-6 w-6 text-blue-600" }),
    title: "Smart Keyword Analysis",
    description:
      "Paste a job description and upload your resume. Our AI instantly extracts the exact missing keywords you need to beat the ATS.",
  },
  {
    icon: React.createElement(Mail, { className: "h-6 w-6 text-indigo-600" }),
    title: "AI Outreach Templates",
    description:
      "Instantly generate highly personalized email and direct message templates based on your resume to send to recruiters.",
  },
  {
    icon: React.createElement(LineChart, {
      className: "h-6 w-6 text-amber-500",
    }),
    title: "Real-Time Match Scoring",
    description:
      "Get an instant ATS compatibility score. See exactly how well your resume matches the job description before you even hit submit.",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    tier: "Starter",
    price: "Free",
    description: "Perfect for testing the waters.",
    features: [
      "1 Resume Upload",
      "Basic ATS Match Score",
      "Up to 1 Job Scans/month",
    ],
    buttonText: "Start for Free",
    popular: false,
    href: "/signup",
  },
  {
    tier: "Pro Seeker",
    price: "$12",
    period: "/month",
    description: "Everything you need to land the interview.",
    features: [
      "Unlimited Resume Uploads",
      "Advanced AI Keyword Gap Analysis",
      "Unlimited Job Scans",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
    href: "/signup",
  },
];

const mockAiData = {
  overallScore: 82,
  resumeOverview: "",
  breakdown: [
    {
      id: "skills",
      title: "Keywords & Skills",
      score: 75,
      description: "How well your technical skills match the job description.",
      good: [
        "React and Next.js experience is clearly highlighted.",
        "Strong match for frontend UI component building.",
      ],
      bad: [
        "Missing explicit mentions of 'TypeScript'.",
        "No mention of 'Agile methodologies' which the job requires.",
      ],
    },
    {
      id: "content",
      title: "Content & Impact",
      score: 88,
      description: "The strength of your phrasing and measurable achievements.",
      good: [
        "Excellent use of strong action verbs (e.g., 'Architected', 'Deployed').",
        "Great use of quantifiable metrics in your most recent role.",
      ],
      bad: ["Older experience entries lack measurable impact."],
    },
    {
      id: "styling",
      title: "Structure & Styling",
      score: 90,
      description: "Readability and ATS formatting compatibility.",
      good: [
        "Clean, single-column layout makes text extraction flawless.",
        "Standard section headers used correctly.",
      ],
      bad: ["Date formatting is slightly inconsistent. Stick to MM/YYYY."],
    },
  ],
  templates: {
    email:
      "Subject: Application for [Job Title] - [Your Name]\n\nHi [Hiring Manager Name],\n\nI noticed the [Job Title] opening at [Company] and wanted to reach out. With my background in React and track record of optimizing user interfaces, I am confident I can bring immediate value to your team.\n\nI have attached my resume for your review.\n\nBest,\n[Your Name]",
    message:
      "Hi [Name], I saw you are hiring for a [Job Title] at [Company]. I have strong experience in React/Next.js and would love to connect and share my resume!",
  },
};
