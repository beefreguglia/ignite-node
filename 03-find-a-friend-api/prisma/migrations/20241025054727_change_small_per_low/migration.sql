/*
  Warnings:

  - The values [SMALL] on the enum `Depends` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Depends_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "pets" ALTER COLUMN "depends" TYPE "Depends_new" USING ("depends"::text::"Depends_new");
ALTER TYPE "Depends" RENAME TO "Depends_old";
ALTER TYPE "Depends_new" RENAME TO "Depends";
DROP TYPE "Depends_old";
COMMIT;
