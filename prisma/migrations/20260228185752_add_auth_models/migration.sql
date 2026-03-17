-- AlterTable
ALTER TABLE "user" ADD COLUMN     "scansUsed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tier" TEXT NOT NULL DEFAULT 'free';

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL,
    "targetRole" TEXT NOT NULL,
    "targetCompany" TEXT NOT NULL,
    "resumeFileName" TEXT,
    "resumeUrl" TEXT,
    "overallScore" INTEGER NOT NULL,
    "breakdown" JSONB NOT NULL,
    "emailTemplate" TEXT NOT NULL,
    "messageTemplate" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Analysis_userId_idx" ON "Analysis"("userId");

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
