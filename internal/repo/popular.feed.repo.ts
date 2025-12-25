import { IPopularFeedRepo } from "#internal/interfaces/popular.feed.repo.js";
import { FeedVideo, PrismaClient } from "src/prisma/index.js";

export class PopularFeedRepo implements IPopularFeedRepo{
    constructor(private readonly prisma: PrismaClient){}

    async getPopular(limit: number): Promise<FeedVideo[]>{
        return this.prisma.feedVideo.findMany({
            orderBy: [
                { likesCount: "desc" },
                { commentsCount: "desc" },
                { viewCount: "desc" },
                { createdAt: "desc" },
            ],
            take: limit
        })
    }
}
