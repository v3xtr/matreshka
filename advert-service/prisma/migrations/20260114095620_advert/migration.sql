/*
  Warnings:

  - You are about to drop the column `services` on the `Advert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Advert" DROP COLUMN "services";

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "advertId" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Services_advertId_idx" ON "Services"("advertId");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "Advert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
