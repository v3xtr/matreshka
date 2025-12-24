import { FeedVideo } from "src/prisma/index.js";

export interface IVideoService{
    create(data: FeedVideo): Promise<FeedVideo>
}
