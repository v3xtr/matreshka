import { logger } from "#internal/adapter/logger/logger.js"
import { redisClient } from "#internal/adapter/redis/redis.js"
import { ILikeRepo } from "#internal/interfaces/like.repo.interface.js"
import { PrismaClient } from "src/prisma/index.js"

export class LikeRepo implements ILikeRepo {
  constructor(private readonly prisma: PrismaClient) {}

  async like(videoId: string, userId: string): Promise<void> {

    const redisKey = `video:${videoId}:likes`

    try {
        await redisClient.sAdd(redisKey, userId)
        await redisClient.expire(redisKey, 60 * 60)
    } catch (error) {
        logger.error("Redis error, fallback to Postgres", error)
    }

    await this.prisma.$transaction([
      this.prisma.videoLike.create({
        data: { videoId, userId }
      }),
      this.prisma.feedVideo.update({
        where: { id: videoId },
        data: { likesCount: { increment: 1 } }
      })
    ])
  }

  async unlike(videoId: string, userId: string): Promise<void> {
    
    const redisKey = `video:${videoId}:likes`
    
    try {
        await redisClient.sRem(redisKey, userId)
    } catch (error) {
        logger.error("Redis error, fallback to postgres", error)
    }

    await this.prisma.$transaction([
      this.prisma.videoLike.delete({
        where: {
          videoId_userId: { videoId, userId }
        }
      }),
      this.prisma.feedVideo.update({
        where: { id: videoId },
        data: { likesCount: { decrement: 1 } }
      })
    ])
  }

  async getLikesCount(videoId: string): Promise<number> {
    const redisKey = `video:${videoId}:likes`;

    try {
      const count = await redisClient.sCard(redisKey);
      if (count !== null) return count;
    } catch (error) {
      logger.error("Redis error in getLikesCount", { error });
    }

    const video = await this.prisma.feedVideo.findUnique({
      where: { id: videoId },
      select: { likesCount: true },
    });

    return video?.likesCount ?? 0;
  }
}
