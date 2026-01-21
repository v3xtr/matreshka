import { Request, Response } from 'express'

export interface IMediaController {
    storeMediaData(req: Request, res: Response): Promise<Response>
    getVideos(req: Request, res: Response): Promise<Response>
    deleteMedia(req: Request, res: Response): Promise<Response>
}
