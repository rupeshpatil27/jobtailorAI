import { NextRequest, NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

import prisma from "@/lib/db";
import { getAuth } from "@/lib/auth-utils";
import { AIAnalysisResponse } from "@/types";
import { Prisma } from "@/lib/generated/prisma/client";

export const maxDuration = 60;

const MAX_JOB_DESC_LENGTH = 15000; // ~3,000 words maximum
const MAX_RESUME_TEXT_LENGTH = 100000; // ~6,000 words maximum (Standard resume is < 1000)

const MAX_TITLE_LENGTH = 150;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  let jobLocked = false;
  let currentAnalysisId = "";
  try {
    const session = await getAuth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { analysisId, jobTitle, companyName, jobDescription, pdfText } =
      await req.json();
    currentAnalysisId = analysisId;

    if (!analysisId || !pdfText || !jobDescription || !jobTitle) {
      return NextResponse.json(
        { error: "Missing required data." },
        { status: 400 },
      );
    }

    if (jobTitle.length > MAX_TITLE_LENGTH) {
      return NextResponse.json(
        { error: "Job title is too long." },
        { status: 400 },
      );
    }

    if (jobDescription.length > MAX_JOB_DESC_LENGTH) {
      return NextResponse.json(
        { error: "Job description exceeds maximum length." },
        { status: 400 },
      );
    }

    if (pdfText.length > MAX_RESUME_TEXT_LENGTH) {
      return NextResponse.json(
        { error: "Resume text is too long. Please upload a standard resume." },
        { status: 400 },
      );
    }

    const lockAttempt = await prisma.analysis.updateMany({
      where: { id: analysisId, userId: session.user.id, overallScore: null },
      data: { overallScore: -1 },
    });

    if (lockAttempt.count === 0) {
      return NextResponse.json(
        { error: "This analysis is already processing or completed." },
        { status: 403 },
      );
    }
    jobLocked = true;

    const pdfPart = {
      inlineData: {
        data: pdfText,
        mimeType: "application/pdf",
      },
    };

    // // Call Gemini
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `You are an elite, top-tier technical recruiter and an advanced Applicant Tracking System (ATS). Your job is to rigorously evaluate a candidate's resume against a specific job opportunity.

    TARGET ROLE:
    Job Title: ${jobTitle}
    Company: ${companyName}
    
    JOB DESCRIPTION:
    ${jobDescription}

    YOUR TASK:
    Analyze the attached resume PDF against the job description. Be strict, realistic, and highly analytical. Do not be overly generous. If the resume is missing core skills mentioned in the JD, penalize the score.

    Output a JSON object that EXACTLY matches the following schema. Do not include any extra keys, markdown, or code blocks.
    
    {
      "overallScore": <number between 0 and 100 representing ATS match>,
      "resumeOverview": "<Write a sharp, 2-3 line executive summary of how well this candidate fits the role. Highlight their biggest strength and their biggest critical gap.>",
      "breakdown": [
        <Generate exactly 3 objects representing the most important evaluation categories for this specific resume and job description. Use the following structure:>
        {
          "id": "<Generate a short, snake_case identifier (e.g., core_skills, impact_metrics, ats_formatting)>",
          "title": "<Generate a professional, concise title for this category (e.g., 'Core Competencies', 'Measurable Impact', 'Structure & Readability')>",
          "score": <number between 0 and 100 for this specific category>,
          "description": "<Generate a 1-sentence description explaining what this category is evaluating.>",
          "good": [<array of 2-3 specific strings highlighting strengths found in the resume for this category>],
          "bad": [<array of 2-3 specific strings highlighting weaknesses, missing keywords, or poor phrasing in this category>]
        }
      ],
      "templates": {
        "email": "<Write a highly professional, persuasive cold email to the hiring manager at ${companyName} for the ${jobTitle} role. Incorporate 1 or 2 specific strengths directly from the candidate's resume to make it personalized.>",
        "message": "<Write a short, punchy LinkedIn connection request message (max 300 chars) mentioning ${companyName} and ${jobTitle}.>"
      }
    }`;

    const result = await model.generateContent([prompt, pdfPart]);
    const responseText = result.response.text();
    const aiData = JSON.parse(responseText) as AIAnalysisResponse;

    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        overallScore: aiData.overallScore,
        resumeOverview: aiData.resumeOverview,
        breakdown: aiData.breakdown as unknown as Prisma.JsonArray,
        emailTemplate: aiData.templates.email,
        messageTemplate: aiData.templates.message,
      },
    });

    return NextResponse.json({ success: true, analysisId });
  } catch (error: any) {
    console.error("API Error:", error);

    if (jobLocked && currentAnalysisId) {
      await prisma.analysis.update({
        where: { id: currentAnalysisId },
        data: { overallScore: null },
      });
    }
    return NextResponse.json(
      { error: error.message || "AI Analysis Failed" },
      { status: 500 },
    );
  }
}
