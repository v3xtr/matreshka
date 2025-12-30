import { Request, Response } from "express"

export interface IChatController{
    getOrCreatePrivateRoom(req: Request, res: Response): Promise<Response>
    getMessages(req: Request, res: Response): Promise<Response>
    searchMessages(req: Request, res: Response): Promise<Response>
    getUserRooms(req: Request, res: Response): Promise<Response>
}
