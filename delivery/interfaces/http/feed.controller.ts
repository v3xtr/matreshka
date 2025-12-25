import { Request, Response } from "express"

export interface IFeedController{
    getFeed(req: Request, res: Response): Promise<Response>
}
