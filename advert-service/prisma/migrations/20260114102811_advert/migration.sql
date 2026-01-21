/*
  Warnings:

  - You are about to drop the column `fromHour` on the `Advert` table. All the data in the column will be lost.
  - You are about to drop the column `toHour` on the `Advert` table. All the data in the column will be lost.
  - You are about to drop the column `workDays` on the `Advert` table. All the data in the column will be lost.
  - You are about to drop the `_AdvertToVideo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[videoId]` on the table `Advert` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[advertId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_AdvertToVideo" DROP CONSTRAINT "_AdvertToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdvertToVideo" DROP CONSTRAINT "_AdvertToVideo_B_fkey";

-- AlterTable
ALTER TABLE "Advert" DROP COLUMN "fromHour",
DROP COLUMN "toHour",
DROP COLUMN "workDays",
ADD COLUMN     "videoId" TEXT;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "advertId" TEXT;

-- DropTable
DROP TABLE "_AdvertToVideo";

-- CreateTable
CREATE TABLE "WorkPeriod" (
    "id" TEXT NOT NULL,
    "fromDay" INTEGER NOT NULL,
    "toDay" INTEGER NOT NULL,
    "fromTime" TEXT,
    "toTime" TEXT,
    "is24h" BOOLEAN NOT NULL DEFAULT false,
    "advertId" TEXT NOT NULL,

    CONSTRAINT "WorkPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkPeriod_advertId_idx" ON "WorkPeriod"("advertId");

-- CreateIndex
CREATE UNIQUE INDEX "Advert_videoId_key" ON "Advert"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_advertId_key" ON "Video"("advertId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "Advert"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPeriod" ADD CONSTRAINT "WorkPeriod_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "Advert"("id") ON DELETE CASCADE ON UPDATE CASCADE;
