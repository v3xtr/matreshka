import { IVideoController } from "#delivery/interfaces/http/video.controller.interface.js";
import { IVideoService } from "#internal/interfaces/video.interface.service.js";
import { Request, Response } from "express";

export class VideoController implements IVideoController{
    constructor(private readonly videoService: IVideoService){}

    async addView(req: Request, res: Response): Promise<Response>{
        const { videoId, userId } = req.body
        const ip = req.ip

        if(!videoId){
            return res.status(400).json({ message: "VideoId обязателен" })
        }

        await this.videoService.addView(videoId, userId, ip)

        return res.sendStatus(204)
    }
}
