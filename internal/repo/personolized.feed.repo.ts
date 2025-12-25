import { IPersonalFeedRepo } from "#internal/interfaces/personal.feed.service.interface.js";
import { VideoViewRepo } from "#internal/repo/video.view.repo.js";
import { FeedVideo, PrismaClient } from "src/prisma/index.js";

export class PersonalFeedRepo implements IPersonalFeedRepo{
    constructor(
        private readonly prisma: PrismaClient,
        private readonly videoViewRepo: VideoViewRepo
    ){}

    async getForUser(userId: string, limit: number): Promise<FeedVideo[]>{
        const viewedIds = await this.videoViewRepo.getViewedVideoIds(userId)

        return this.prisma.feedVideo.findMany({
            where: {
                id: { notIn: viewedIds },
                userId: { not: userId }
            },
            orderBy: [
                { likesCount: "desc" },
                { commentsCount: "desc" },
                { viewCount: "desc" },
                { createdAt: "desc" }
            ],
            take: limit
        })
    }
}
