import { Request, Response } from "express"

export interface ICommentController{
    create(req: Request, res: Response): Promise<Response>
    getByVideo(req: Request, res: Response): Promise<Response>
}
