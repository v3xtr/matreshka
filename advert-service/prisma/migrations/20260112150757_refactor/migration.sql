/*
  Warnings:

  - You are about to drop the column `adress` on the `Advert` table. All the data in the column will be lost.
  - Added the required column `address` to the `Advert` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Advert_id_key";

-- DropIndex
DROP INDEX "Pictures_advertId_key";

-- AlterTable
ALTER TABLE "Advert" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdvertToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AdvertToVideo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AdvertToVideo_B_index" ON "_AdvertToVideo"("B");

-- AddForeignKey
ALTER TABLE "_AdvertToVideo" ADD CONSTRAINT "_AdvertToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Advert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertToVideo" ADD CONSTRAINT "_AdvertToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
