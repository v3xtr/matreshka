import { Request, Response } from "express"

export interface IProfileController{
    getUser(req: Request, res: Response): Promise<Response>
    updateProfile(req: Request, res: Response): Promise<Response>
    updateProfile(req: Request, res: Response): Promise<Response>
    updateAvatar(req: Request, res: Response): Promise<Response>
}
