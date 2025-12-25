import { FeedVideo } from "src/prisma/index.js";

export interface IPopularFeedRepo{
    getPopular(limit: number): Promise<FeedVideo[]>
}
