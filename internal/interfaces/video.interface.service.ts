import { FeedVideo } from "src/prisma/index.js";

export interface IVideoService{
    create(data: FeedVideo): Promise<FeedVideo>
    addView(videoId: string, userId: string, ip?: string): Promise<boolean>
}
