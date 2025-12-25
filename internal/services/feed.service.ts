import { IFeedService } from "#internal/interfaces/feed.service.interface.js";
import { IPersonalFeedRepo } from "#internal/interfaces/personal.feed.service.interface.js";
import { IPopularFeedRepo } from "#internal/interfaces/popular.feed.repo.js";
import { VideoViewRepo } from "#internal/repo/video.view.repo.js";
import { FeedVideo } from "src/prisma/index.js";

export class FeedService implements IFeedService{
    constructor(
        private readonly videoViewRepo: VideoViewRepo,
        private readonly popularFeedRepo: IPopularFeedRepo,
        private readonly personalFeedRepo: IPersonalFeedRepo

    ){}

    async getFeed(userId: string): Promise<FeedVideo[]>{
        if (!userId){
            return this.popularFeedRepo.getPopular(20)
        }

        const hasViews = await this.videoViewRepo.hasAnyViews(userId)

        if(!hasViews){
            return this.popularFeedRepo.getPopular(20)
        }

        return this.personalFeedRepo.getForUser(userId, 20)

    }

}
