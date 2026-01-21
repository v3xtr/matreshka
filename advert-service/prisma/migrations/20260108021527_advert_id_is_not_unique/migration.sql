/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Advert` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[advertId]` on the table `Pictures` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Advert_id_key" ON "Advert"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pictures_advertId_key" ON "Pictures"("advertId");
