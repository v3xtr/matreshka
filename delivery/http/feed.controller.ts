import { IFeedController } from "#delivery/interfaces/http/feed.controller.js";
import { IFeedService } from "#internal/interfaces/feed.service.interface.js";
import { Request, Response } from "express";
import { FeedVideo } from "src/prisma/index.js";

export class FeedController implements IFeedController{
    constructor(private readonly feedService: IFeedService){}

    async getFeed(req: Request, res: Response): Promise<Response>{
        const { userId } = req.params

        if(!userId){
            return res.status(400).json({ message: "userId обязателен" })
        }

        const feed: FeedVideo[] = await this.feedService.getFeed(userId)

        return res.json({ feed })
    }
}
