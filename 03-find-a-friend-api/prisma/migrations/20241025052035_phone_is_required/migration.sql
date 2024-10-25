/*
  Warnings:

  - Made the column `phone` on table `organizations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "phone" SET NOT NULL;
