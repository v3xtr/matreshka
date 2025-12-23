/*
  Warnings:

  - You are about to drop the column `description` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `commentsCount` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the `video_comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "video_comments" DROP CONSTRAINT "video_comments_parentId_fkey";

-- DropForeignKey
ALTER TABLE "video_comments" DROP CONSTRAINT "video_comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "video_comments" DROP CONSTRAINT "video_comments_videoId_fkey";

-- DropForeignKey
ALTER TABLE "video_likes" DROP CONSTRAINT "video_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "video_likes" DROP CONSTRAINT "video_likes_videoId_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_userId_fkey";

-- DropIndex
DROP INDEX "videos_commentsCount_idx";

-- DropIndex
DROP INDEX "videos_likesCount_idx";

-- DropIndex
DROP INDEX "videos_publishedAt_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "description",
DROP COLUMN "password",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "commentsCount",
DROP COLUMN "likesCount",
ALTER COLUMN "cdnUrl" DROP DEFAULT;

-- DropTable
DROP TABLE "video_comments";

-- DropTable
DROP TABLE "video_likes";

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
