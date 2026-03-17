import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth-utils";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAuth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 },
      );
    }

    const { id: analysisId } = await params;

    if (!analysisId) {
      return NextResponse.json(
        { error: "Missing analysis ID" },
        { status: 400 },
      );
    }

    const data = await prisma.analysis.findFirst({
      where: {
        id: analysisId,
        userId: session.user.id,
      },
      select: {
        id: true,
        targetRole: true,
        targetCompany: true,
        resumeUrl: true,
        overallScore: true,
        resumeOverview: true,
        breakdown: true,
        emailTemplate: true,
        messageTemplate: true,
        createdAt: true,
      },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Analysis not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch analysis:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
