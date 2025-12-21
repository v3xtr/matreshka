/*
  Warnings:

  - Added the required column `cdnUrl` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "cdnUrl" TEXT NOT NULL;
