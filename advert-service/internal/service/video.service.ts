import { IVideoRepo } from "#internal/interfaces/repo/video.repo.interface.js";
import { IVideoService } from "#internal/interfaces/service/video.service.interface.js";

export class VideoService implements IVideoService{
    constructor(private readonly videoRepo: IVideoRepo) {}

    async createVideo(data: any): Promise<any> {
        return await this.videoRepo.create(data)
    }
}
