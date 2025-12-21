import { Request, Response } from 'express'

export interface IVideoController {
    uploadVideo(req: Request, res: Response): Promise<Response>
    getVideos(req: Request, res: Response): Promise<Response>
}
