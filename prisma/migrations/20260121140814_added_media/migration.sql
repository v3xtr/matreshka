-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "cdnUrl" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);
