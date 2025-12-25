-- CreateTable
CREATE TABLE "video_views" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_views_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "video_views_videoId_idx" ON "video_views"("videoId");

-- CreateIndex
CREATE INDEX "video_views_userId_idx" ON "video_views"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "video_views_videoId_userId_key" ON "video_views"("videoId", "userId");
