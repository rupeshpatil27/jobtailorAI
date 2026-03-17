/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `rate_limit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rate_limit" DROP COLUMN "expiresAt";
