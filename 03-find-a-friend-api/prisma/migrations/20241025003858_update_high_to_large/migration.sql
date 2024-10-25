/*
  Warnings:

  - The values [HIGH] on the enum `Space` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Space_new" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');
ALTER TABLE "pets" ALTER COLUMN "space" TYPE "Space_new" USING ("space"::text::"Space_new");
ALTER TYPE "Space" RENAME TO "Space_old";
ALTER TYPE "Space_new" RENAME TO "Space";
DROP TYPE "Space_old";
COMMIT;
