-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "cdnUrl" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
