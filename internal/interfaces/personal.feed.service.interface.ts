import { FeedVideo } from "src/prisma/index.js";

export interface IPersonalFeedRepo{
    getForUser(userId: string, limit: number): Promise<FeedVideo[]>
}
