import { IVideoRepo } from "#internal/interfaces/video.repo.interface.js";
import { FeedVideo, PrismaClient } from "src/prisma/index.js";

export class VideoRepo implements IVideoRepo{
    constructor(private readonly prisma: PrismaClient) {}

    async create(data: FeedVideo): Promise<FeedVideo>{
        console.log("Repo: ", data)
        return this.prisma.feedVideo.create({ data })
    }
}
