import { ILikeRepo } from "#internal/interfaces/like.repo.interface.js";
import { ILikeService } from "#internal/interfaces/like.service.interface.js";

export class LikeService implements ILikeService{
    constructor(private readonly likeRepo: ILikeRepo){}

    async like(videoId: string, userId: string): Promise<void>{
        await this.likeRepo.like(videoId, userId)
    }

    async unlike(videoId: string, userId: string): Promise<void>{
        await this.likeRepo.unlike(videoId, userId)
    }

    async getLikesCount(videoId: string): Promise<number | null>{
        return await this.likeRepo.getLikesCount(videoId)
    }
}
