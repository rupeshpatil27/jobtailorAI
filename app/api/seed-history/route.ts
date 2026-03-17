// app/api/seed-history/route.ts
import { getAuth } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAuth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companies = [
      "Vercel",
      "Stripe",
      "Netflix",
      "OpenAI",
      "Google",
      "Meta",
      "Spotify",
      "Discord",
    ];
    const roles = [
      "Frontend Engineer",
      "React Developer",
      "Full Stack Engineer",
      "Backend Architect",
      "UX Designer",
      "Product Manager",
    ];

    // Generate 25 fake records in a loop
    for (let i = 0; i < 25; i++) {
      await prisma.analysis.create({
        data: {
          userId: session.user.id,
          targetRole: roles[Math.floor(Math.random() * roles.length)],
          targetCompany:
            companies[Math.floor(Math.random() * companies.length)],
          overallScore: Math.floor(Math.random() * 60) + 40, // Random score between 40 and 100
          // Subtract 'i' days from today so they show up in chronological order!
          createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        },
      });
    }

    return NextResponse.json({
      message: "Successfully seeded 25 realistic scans! Go test your UI.",
    });
  } catch (error) {
    console.error("[SEED_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
