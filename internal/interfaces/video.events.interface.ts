import { Video } from "src/prisma/index.js";

export interface IVideoEvenets{
    sendToQueue(video: Video): Promise<void>
}
