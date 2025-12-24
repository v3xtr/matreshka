import { ILikeController } from "#delivery/interfaces/http/like.controller.interface.js";
import { ILikeService } from "#internal/interfaces/like.service.interface.js";
import { LikeRequest } from "#internal/validation/zod/like.validation.js";
import { Request, Response } from "express";

export class LikeController implements ILikeController{
    constructor(private readonly likeService: ILikeService){}

    async like(req: Request, res: Response): Promise<Response>{
        const result = LikeRequest.safeParse(req.body)

        if(!result.success){
            return res.status(400).json({ message: "Неверные Данные" })
        }

        await this.likeService.like(result.data.videoId, result.data.userId)

        return res.sendStatus(204)
    }

    async unlike(req: Request, res: Response): Promise<Response>{
        const result = LikeRequest.safeParse(req.body)

        if(!result.success){
            return res.status(400).json({ message: "Неверные Данные" })
        }

        await this.likeService.unlike(result.data.videoId, result.data.userId)

        return res.sendStatus(204)
    }

    async getLikesCount(req: Request, res: Response): Promise<Response>{
        const { videoId } = req.params

        if(!videoId){
            return res.status(400).json({ message: "videoId обязателен", params: req.params })
        }

        const likesCount = await this.likeService.getLikesCount(videoId)

        return res.json({ likesCount })
    }
}
