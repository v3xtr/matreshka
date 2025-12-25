import { redisClient } from "#internal/adapter/redis/redis.js";
import { IVideoRepo } from "#internal/interfaces/video.repo.interface.js";
import { FeedVideo, PrismaClient } from "src/prisma/index.js";

const VIEW_TTL = 60 * 60;

export class VideoRepo implements IVideoRepo {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: FeedVideo): Promise<FeedVideo> {
    return this.prisma.feedVideo.create({ data });
  }

  async addView(videoId: string, userId?: string, ip?: string): Promise<boolean> {
    const viewerKey = userId ?? ip;
    if (!viewerKey) return false;

    const redisKey = `video:${videoId}:views`;

    try {
      const added = await redisClient.sAdd(redisKey, viewerKey);
      if (added === 0) return false;

      await redisClient.expire(redisKey, VIEW_TTL);
    } catch {}

    try {
      await this.prisma.$transaction([
        this.prisma.videoView.create({
          data: { videoId, userId, ip },
        }),
        this.prisma.feedVideo.update({
          where: { id: videoId },
          data: { viewCount: { increment: 1 } },
        }),
      ]);

      return true;
    } catch {
      try {
        await redisClient.sRem(redisKey, viewerKey);
      } catch {}

      return false;
    }
  }
}
