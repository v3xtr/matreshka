import { Request, Response } from 'express'
import { GetProfileSchema, UpdateProfileSchema } from '../../internal/validation/profile.validation.js'
import { IProfileService } from '../../internal/interfaces/profile.service.interface.js'
import { logger } from '#internal/adapter/logger/logger.js'
import { TypeUserWithoutPassword } from '#internal/types/user.type.js'
import { IProfileController } from './interfaces/profile.controller.interface.js'

export class ProfileController implements IProfileController{
    constructor(private readonly profileService: IProfileService){}

    async getUser(req: Request, res: Response): Promise<Response>{
        logger.info(req.params)
        const result = await GetProfileSchema.safeParseAsync(req.params)

        if(!result.success){
            logger.warn("Пользователь ввел не те данные")
            return res.status(400).json({ message: "Неверные Данные", error: result.error })
        }

        const user: TypeUserWithoutPassword | null = await this.profileService.getUser(result.data.id)
        logger.info(user)
        logger.info("Пользователь успешно получил профиль")
        return res.json({ user })
    }

    async updateProfile(req: Request, res: Response): Promise<Response>{
        logger.info("request body", req.body)
        const result = await UpdateProfileSchema.safeParseAsync(req.body)

        if(!result.success){
            logger.warn("Пользователь отправил неверные данные")
            return res.status(400).json({ message: "Неверные Данные", error: result.error })
        }

        const user: TypeUserWithoutPassword = await this.profileService.updateUser(result.data)
        logger.info(user)
        logger.info("Пользователь успешно обновил профиль")
        return res.json({ message: "Профиль был успешно обновлен", user})
    }

    async updateAvatar(req: Request, res: Response): Promise<Response>{
        const { id, avatar } = req.body

        console.log(`${process.env.AWS_BUCKET_NAME}`, `${process.env.AWS_BUCKET_URL}`)

        if (!avatar || !avatar.startsWith("data:image")) {
            return res.status(400).send("Некорректные данные изображения");
        }

        const avatarUrl: string = await this.profileService.updateAvatar(id, avatar)
        
        return res.json({ message: "Аватарка была успешно обновлена", avatarUrl })
    }
}
