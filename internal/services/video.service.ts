import { IVideoService } from "#internal/interfaces/video.interface.service.js";
import { IVideoRepo } from "#internal/interfaces/video.repo.interface.js";
import {FeedVideo, Video} from "src/prisma/index.js";

export class VideoService implements IVideoService{
    constructor(private readonly videoRepo: IVideoRepo) {}

    async create(data: Video): Promise<Video>{
        return await this.videoRepo.create(data)
    }

    async createFeedVideo(data: FeedVideo): Promise<FeedVideo>{
        return this.videoRepo.createFeedVideo(data)
    }

    async addView(videoId: string, userId: string, ip?: string): Promise<boolean>{
        return this.videoRepo.addView(videoId, userId, ip)
    }

}
