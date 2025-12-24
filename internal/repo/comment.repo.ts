import { logger } from "#internal/adapter/logger/logger.js";
import { redisClient } from "#internal/adapter/redis/redis.js";
import { ICommentRepo } from "#internal/interfaces/comment.repo.interface.js";
import { CommentDTO } from "#internal/validation/dto/comment.dto.js";
import { CommentRequestType } from "#internal/validation/zod/comment.validation.js";
import { PrismaClient, VideoComment } from "src/prisma/index.js";

export class CommentRepo implements ICommentRepo{
    constructor(private readonly prisma: PrismaClient){}

    async create(data: CommentRequestType): Promise<void>{
        
        const redisKey = `video:${data.videoId}:commentsCount`

        try {
            await redisClient.incr(redisKey);
            await redisClient.expire(redisKey, 60 * 60)
        } catch (error) {
            logger.error("Redis error, fallback to postgres")
        }

        await this.prisma.$transaction(async (tx) => {
            await tx.videoComment.create({ data })
            await tx.feedVideo.update({
                where: { id: data.videoId },
                data: { commentsCount: { increment: 1 } }
            })
        })
    }

    async getByVideo(videoId: string): Promise<CommentDTO[]>{
        return this.prisma.videoComment.findMany({
            where: { videoId },
            orderBy: { createdAt: "desc" },
            select: { 
                id: true,
                userId: true,
                text: true,
                parentId: true,
                createdAt: true
             }
        })
    }

}
