import { IFeedController } from "#delivery/interfaces/http/feed.controller.js";
import { Request, Response } from "express";

export class FeedController implements IFeedController{
    constructor(){}

    async getFeed(req: Request, res: Response): Promise<Response>{
        const { userId } = req.params

        if(!userId){
            return res.status(400).json({ message: "userId обязателен" })
        }

        return res.json({  })
    }
}
