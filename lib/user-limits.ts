import prisma from "@/lib/db";

export async function checkScanQuota(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tier: true, scansUsed: true },
  });

  if (!user) {
    return { isAllowed: false, message: "User not found.", status: 404 };
  }

  if (user.tier === "free" && user.scansUsed >= 1) {
    return { 
      isAllowed: false, 
      message: "You have used your free scan. Please upgrade to Pro.", 
      status: 403 
    };
  }

  return { isAllowed: true, status: 200 };
}