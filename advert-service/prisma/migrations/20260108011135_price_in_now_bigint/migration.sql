/*
  Warnings:

  - The `price` column on the `Advert` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Advert" DROP COLUMN "price",
ADD COLUMN     "price" BIGINT;
