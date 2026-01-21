import {FeedVideo, Video} from "src/prisma/index.js";

export interface IVideoService{
    create(data: Video): Promise<Video>
    createFeedVideo(data: FeedVideo): Promise<FeedVideo>
    addView(videoId: string, userId: string, ip?: string): Promise<boolean>
}
