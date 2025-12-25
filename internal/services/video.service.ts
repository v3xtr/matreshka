import { IVideoService } from "#internal/interfaces/video.interface.service.js";
import { IVideoRepo } from "#internal/interfaces/video.repo.interface.js";
import { FeedVideo } from "src/prisma/index.js";

export class VideoService implements IVideoService{
    constructor(private readonly videoRepo: IVideoRepo) {}

    async create(data: FeedVideo): Promise<FeedVideo>{
        return this.videoRepo.create(data)
    }

    async addView(videoId: string, userId: string, ip?: string): Promise<boolean>{
        return this.videoRepo.addView(videoId, userId, ip)
    }

}
