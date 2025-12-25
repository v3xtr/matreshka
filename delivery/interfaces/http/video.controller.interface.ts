import { Request, Response } from "express"

export interface IVideoController{
    addView(req: Request, res: Response): Promise<Response>
}
