/*
  Warnings:

  - You are about to drop the column `uploadedAt` on the `videos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "videos_uploadedAt_idx";

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "uploadedAt",
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "video_likes" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_comments" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "video_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "video_likes_videoId_idx" ON "video_likes"("videoId");

-- CreateIndex
CREATE INDEX "video_likes_userId_idx" ON "video_likes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "video_likes_videoId_userId_key" ON "video_likes"("videoId", "userId");

-- CreateIndex
CREATE INDEX "video_comments_videoId_idx" ON "video_comments"("videoId");

-- CreateIndex
CREATE INDEX "video_comments_userId_idx" ON "video_comments"("userId");

-- CreateIndex
CREATE INDEX "video_comments_parentId_idx" ON "video_comments"("parentId");

-- CreateIndex
CREATE INDEX "videos_publishedAt_idx" ON "videos"("publishedAt");

-- CreateIndex
CREATE INDEX "videos_likesCount_idx" ON "videos"("likesCount");

-- CreateIndex
CREATE INDEX "videos_commentsCount_idx" ON "videos"("commentsCount");

-- AddForeignKey
ALTER TABLE "video_likes" ADD CONSTRAINT "video_likes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_likes" ADD CONSTRAINT "video_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_comments" ADD CONSTRAINT "video_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "video_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_comments" ADD CONSTRAINT "video_comments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_comments" ADD CONSTRAINT "video_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
