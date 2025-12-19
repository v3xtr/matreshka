import { Request, Response } from "express"

export interface IProfileController{
    getUser(req: Request, res: Response): Promise<Response | any>
    updateProfile(req: Request, res: Response): Promise<Response>
}
