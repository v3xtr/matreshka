import { IVideoViewRepo } from "#internal/interfaces/video.view.repo.interface.js";
import { PrismaClient } from "src/prisma/index.js";

export class VideoViewRepo implements IVideoViewRepo{
    constructor(private readonly prisma: PrismaClient){}

    async hasAnyViews(userId: string): Promise<boolean>{
        const count = await this.prisma.videoView.count({
            where: { userId }
        })

        return count > 0
    }

    async getViewedVideoIds(userId: string): Promise<string[]>{
        const views = await this.prisma.videoView.findMany({
            where: { userId },
            select: { videoId: true }
        })

        return views.map(view => view.videoId)
    }

}
