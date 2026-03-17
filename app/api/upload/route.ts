import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth-utils";
import { uploadPdfToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/db";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 5MB

const MAX_TITLE_LENGTH = 150;

export async function POST(req: NextRequest) {
  let userCharged = false;
  let userId = "";
  try {
    const session = await getAuth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    userId = session.user.id;

    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const jobTitle = formData.get("jobTitle") as string;
    const companyName = formData.get("companyName") as string;
    const jobDescription = formData.get("jobDescription") as string;

    if (!jobTitle) {
      return NextResponse.json(
        { error: "Missing required data for analysis." },
        { status: 400 },
      );
    }

    if (jobTitle.length > MAX_TITLE_LENGTH) {
      return NextResponse.json(
        { error: "Job title is too long." },
        { status: 400 },
      );
    }

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "A valid PDF resume is required." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File exceeds ${MAX_FILE_SIZE_MB}MB limit.` },
        { status: 400 },
      );
    }

    const chargeAttempt = await prisma.user.updateMany({
      where: {
        id: userId,
        OR: [{ tier: "pro" }, { tier: "free", scansUsed: 0 }],
      },
      data: { scansUsed: { increment: 1 } },
    });

    if (chargeAttempt.count === 0) {
      return NextResponse.json(
        { error: "You have used your free scan. Please upgrade to Pro." },
        { status: 403 },
      );
    }
    userCharged = true;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length === 0) {
      return NextResponse.json(
        { error: "The uploaded file is empty or corrupted." },
        { status: 400 },
      );
    }

    const pdfData = buffer.toString("base64");
    const fileUri = `data:${file.type};base64,${pdfData}`;

    const uploadResult = await uploadPdfToCloudinary(fileUri, userId);

    const newAnalysis = await prisma.analysis.create({
      data: {
        userId: userId,
        targetRole: jobTitle,
        targetCompany: companyName || "Unknown",
        resumeFileName: file.name,
        resumeUrl: uploadResult.secure_url,
      },
    });

    return NextResponse.json({
      analysisId: newAnalysis.id,
      cloudinaryPublicId: uploadResult.public_id,
      pdfText: pdfData,
      jobTitle: jobTitle,
      companyName: companyName,
      jobDescription: jobDescription,
    });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    if (userCharged && userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { scansUsed: { decrement: 1 } },
      });
    }
    return NextResponse.json(
      { error: "Failed to upload resume." },
      { status: 500 },
    );
  }
}
