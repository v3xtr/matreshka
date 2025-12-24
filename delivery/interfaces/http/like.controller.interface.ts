import { Request, Response } from "express"

export interface ILikeController {
  like(req: Request, res: Response): Promise<Response>
  unlike(req: Request, res: Response): Promise<Response>
  getLikesCount(req: Request, res: Response): Promise<Response>
}
