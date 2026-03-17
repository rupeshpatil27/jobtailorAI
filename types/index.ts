export interface BreakdownItem {
  id: string;
  title: string;
  score: number;
  description: string;
  good: string[];
  bad: string[];
}

export interface Templates {
  email: string;
  message: string;
}

export interface AnalyzeResponse {
  overallScore: number;
  resumeOverview: string;
  targetRole: string;
  targetCompany: string;
  breakdown: BreakdownItem[];
  resumeFileName: string;
  resumeUrl: string;
  emailTemplate: string;
  messageTemplate: string;
  createdAt: string;
}

export type FilterType = "All" | "High" | "Medium" | "Low";

export interface ScanRecord {
  id: string;
  targetRole: string;
  targetCompany: string;
  overallScore: number;
  createdAt: string | Date;
}

export interface BreakdownCategory {
  id: string;
  title: string;
  score: number;
  description: string;
  good: string[];
  bad: string[];
}

export interface AIAnalysisResponse {
  overallScore: number;
  resumeOverview: string;
  breakdown: BreakdownCategory[];
  templates: {
    email: string;
    message: string;
  };
}
