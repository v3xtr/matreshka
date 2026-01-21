import { IVideoRepo } from "#internal/interfaces/repo/video.repo.interface.js";
import {PrismaClient, Video} from "src/prisma/client.js";

export class VideoRepo implements IVideoRepo{
    constructor(private readonly prisma: PrismaClient) {}

    async create(data: Video): Promise<Video>{
        return await this.prisma.video.create({
            data
        })
    }
}
