import { Request, Response } from "express"

export interface IAdvertController {
    create(req: Request, res: Response): Promise<Response>
    getAdvert(req: Request, res: Response): Promise<Response>
    getAdverts(req: Request, res: Response): Promise<Response>
    update(req: Request, res: Response): Promise<Response>
    delete(req: Request, res: Response): Promise<Response>
}
