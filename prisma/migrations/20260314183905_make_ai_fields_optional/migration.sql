-- AlterTable
ALTER TABLE "Analysis" ALTER COLUMN "overallScore" DROP NOT NULL,
ALTER COLUMN "breakdown" DROP NOT NULL,
ALTER COLUMN "emailTemplate" DROP NOT NULL,
ALTER COLUMN "messageTemplate" DROP NOT NULL;
