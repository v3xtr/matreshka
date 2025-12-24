import { FeedVideo } from "src/prisma/index.js";

export interface IVideoRepo{
     create(data: FeedVideo): Promise<FeedVideo>
}
