import { Request, Response } from "express"

export interface IAuthController{
    register(req: Request, res: Response): Promise<Response>
    login(req: Request, res: Response): Promise<Response>
    checkCode(req: Request, res: Response): Promise<Response>
    register(req: Request, res: Response): Promise<Response>
    sendSms(req: Request, res: Response): Promise<Response>
    sendSms(req: Request, res: Response): Promise<Response>
}
