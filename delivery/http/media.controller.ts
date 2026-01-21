import { logger } from "#internal/adapter/logger/logger.js";
import { IMediaController } from "./interfaces/media.controller.interface.js";
import { Request, Response } from 'express'
import {
    DeleteMediaRequestSchema,
    GetVideosRequestSchema,
    StoreMediaRequestSchema
} from "#internal/validation/media.validation.js";
import { Media } from 'src/prisma/index.js'
import { IMediaService } from "#internal/interfaces/media.service.interface.js";

export class MediaController implements IMediaController {
    constructor(private readonly mediaService: IMediaService){}

    async storeMediaData(req: Request, res: Response): Promise<Response> {
        try {
            const result = StoreMediaRequestSchema.safeParse(req.body) // ← req.body это массив!

            if(!result.success){
                return res.status(400).json({
                    message: "Переданы неверные данные",
                    errors: result.error
                })
            }

            const mediaResults: Media[] = await this.mediaService.storeMedia(result.data)

            return res.status(201).json({
                success: true,
                message: `Успешно сохранено ${mediaResults.length} медиа`,
                count: mediaResults.length,
                media: mediaResults
            })

        } catch (error) {
            logger.error('💥 Upload error:', error)
            return res.status(500).json({ message: "внутряняя ошибка сервера" })
        }
    }

    async getVideos(req: Request, res: Response): Promise<Response> {
        try {

            const result = GetVideosRequestSchema.safeParse(req.body)
            
            if (!result.success) {
                return res.status(401).json({ message: 'Не передан id' })
            }

            const videos = await this.mediaService.getUserVideos(result.data.id)
            
            logger.info("Videos", videos)

            return res.json({ success: true, count: videos?.length, data: videos })

        } catch (error) {
            logger.error('Ошибка при получении видео', error)
            return res.status(500).json({ error: 'Ошибка получения видео' })
        }
    }

    async deleteMedia(req: Request, res: Response): Promise<Response>{
        try {
            const result = DeleteMediaRequestSchema.safeParse(req.params)

            if(!result.success){
                return res.status(401).json({ message: "не передан userId или mediaId" })
            }

            await this.mediaService.deleteVideo(result.data.userId, result.data.videoId)

            return res.json({ message: "Видео было успешно удалено" })

        } catch (error) {
            return res.status(500).json({ error: "Ошибка удаления видео" })
        }
    }
}
