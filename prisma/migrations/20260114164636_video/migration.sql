/*
  Warnings:

  - You are about to drop the column `duration` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `resolution` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `videos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "videos_status_idx";

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "duration",
DROP COLUMN "originalName",
DROP COLUMN "resolution",
DROP COLUMN "size",
DROP COLUMN "status",
DROP COLUMN "thumbnailUrl";

-- DropEnum
DROP TYPE "VideoStatus";
