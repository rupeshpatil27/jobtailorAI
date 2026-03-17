import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";
import { getAuth } from "@/lib/auth-utils";
import { deleteFromCloudinary, UPLOAD_FOLDER_NAME } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cloudinaryPublicId, analysisId } = await req.json();

    if (!cloudinaryPublicId || !analysisId) {
      return NextResponse.json(
        { error: "Missing rollback data" },
        { status: 400 },
      );
    }

    const expectedPrefix = `${UPLOAD_FOLDER_NAME}/${session.user.id}/`;

    if (!cloudinaryPublicId.startsWith(expectedPrefix)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    await deleteFromCloudinary(cloudinaryPublicId);

    await prisma.$transaction([
      prisma.analysis.delete({ where: { id: analysisId } }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { scansUsed: { decrement: 1 } },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rollback API Error:", error);
    return NextResponse.json({ error: "Rollback failed" }, { status: 500 });
  }
}
