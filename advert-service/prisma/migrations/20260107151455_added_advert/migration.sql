-- CreateTable
CREATE TABLE "Advert" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "profession" TEXT,
    "sphere" TEXT,
    "salarySrart" TEXT,
    "salaryEnd" TEXT,
    "price" TEXT,
    "employment" TEXT,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "adress" TEXT NOT NULL,

    CONSTRAINT "Advert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pictures" (
    "id" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "advertId" TEXT NOT NULL,

    CONSTRAINT "Pictures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Advert" ADD CONSTRAINT "Advert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pictures" ADD CONSTRAINT "Pictures_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "Advert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
