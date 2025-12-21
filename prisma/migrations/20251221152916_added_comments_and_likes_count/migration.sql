-- DropIndex
DROP INDEX "videos_createdAt_idx";

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "commentsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0;
