/*
  Warnings:

  - Added the required column `videoUrl` to the `feed_videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feed_videos" ADD COLUMN     "videoUrl" TEXT NOT NULL,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "feed_videos_viewCount_idx" ON "feed_videos"("viewCount");
