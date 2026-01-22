/*
  Warnings:

  - The required column `advertId` was added to the `Advert` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Advert" ADD COLUMN     "advertId" TEXT NOT NULL;
