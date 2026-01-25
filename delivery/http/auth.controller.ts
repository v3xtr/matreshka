import { Request, Response } from 'express'
import { LoginSchema, RegisterSchema } from '#internal/validation/auth.validation.js'
import { IAuthController } from './interfaces/auth.controller.interface.js'
import { IAuthService } from '#internal/interfaces/auth.service.interface.js'
import { logger } from "#internal/adapter/logger/logger.js";

export class AuthController implements IAuthController{
    constructor(private readonly authService: IAuthService){}


    async register(req: Request, res: Response): Promise<Response>{
        const result = await RegisterSchema.safeParseAsync(req.body)

        if(!result.success){
            return res.status(400).json({message: "Неверные данные", error: result.error })
        }

        const { user, accessToken, refreshToken } = await this.authService.register(result.data)

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: false,
        })

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: false
        })

        return res.json({ message: "Вы зарегестрировались", user })
    }

    async login(req: Request, res: Response): Promise<Response>{
        const result = await LoginSchema.safeParseAsync(req.body)

        if(!result.success){
            return res.status(400).json({ message: "Неверные данные", error: result.error })
        }

        const { user, accessToken, refreshToken } = await this.authService.login(result.data)

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: false,
        })

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: false
        })

        return res.json({ message: "Вы успешно вошли в систему", user })
    }

    async checkCode(req: Request, res: Response): Promise<Response>{
        try {
            const { userId, code } = req.body

             const codeResponse: boolean = await this.authService.checkCode(userId, code)

            return res.json({ message: "заглушка", codeSuccess: codeResponse })
        }catch (error){
            logger.error(`Произошла ошибка при проверки кода: ${error}`)
            return res.status(500).json({ message: "Внутряняя ошибка сервера" })
        }
    }

    async sendEmail(req: Request, res: Response): Promise<Response>{
        try {
            const { userId, email } = req.body

            const response: number = await this.authService.sendEmailCode(userId, email)

            return res.json({ message: response })
        }catch (error){
            return res.status(500).json({ message: "Внутряняя ошибка сервера" })
        }
    }
    async sendSms(req: Request, res: Response): Promise<Response>{
        try {
            const { userId, phone } = req.body

            const response: number = await this.authService.sendSmsCode(userId, phone)

            return res.json({ message: response })
        }catch (error){
            return res.status(500).json({ message: "Внутряняя ошибка сервера" })
        }
    }
}
