import { getAuth } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getAuth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "All";
    const cursor = searchParams.get("cursor");
    const limit = 10;

    const whereClause: Prisma.AnalysisWhereInput = {
      userId: session.user.id,
    };

    if (search) {
      whereClause.OR = [
        { targetRole: { contains: search, mode: "insensitive" } },
        { targetCompany: { contains: search, mode: "insensitive" } },
      ];
    }

    if (filter === "High") whereClause.overallScore = { gte: 80 };
    if (filter === "Medium") whereClause.overallScore = { gte: 60, lt: 80 };
    if (filter === "Low") whereClause.overallScore = { lt: 60 };

    // 4. Fetch the data
    const scans = await prisma.analysis.findMany({
      where: whereClause,
      select: {
        id: true,
        targetRole: true,
        targetCompany: true,
        overallScore: true,
        createdAt: true,
      },
      take: limit + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (scans.length > limit) {
      const nextItem = scans.pop();
      nextCursor = nextItem?.id;
    }

    return NextResponse.json({
      scans,
      nextCursor,
    });
  } catch (error) {
    console.error("[HISTORY_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
