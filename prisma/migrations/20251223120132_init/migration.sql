-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feed_videos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "commentsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feed_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_likes" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_comments" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "video_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "feed_videos_userId_idx" ON "feed_videos"("userId");

-- CreateIndex
CREATE INDEX "feed_videos_likesCount_idx" ON "feed_videos"("likesCount");

-- CreateIndex
CREATE INDEX "feed_videos_commentsCount_idx" ON "feed_videos"("commentsCount");

-- CreateIndex
CREATE INDEX "video_likes_videoId_idx" ON "video_likes"("videoId");

-- CreateIndex
CREATE INDEX "video_likes_userId_idx" ON "video_likes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "video_likes_videoId_userId_key" ON "video_likes"("videoId", "userId");

-- CreateIndex
CREATE INDEX "video_comments_videoId_idx" ON "video_comments"("videoId");

-- CreateIndex
CREATE INDEX "video_comments_userId_idx" ON "video_comments"("userId");

-- CreateIndex
CREATE INDEX "video_comments_parentId_idx" ON "video_comments"("parentId");
