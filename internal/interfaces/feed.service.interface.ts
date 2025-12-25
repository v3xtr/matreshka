import { FeedVideo } from "src/prisma/index.js";

export interface IFeedService{
    getFeed(userId: string): Promise<FeedVideo[]>
}
