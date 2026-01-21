/*
  Warnings:

  - You are about to drop the column `salarySrart` on the `Advert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Advert" DROP COLUMN "salarySrart",
ADD COLUMN     "salaryStart" TEXT;
