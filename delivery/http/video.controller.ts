import { logger } from "#internal/adapter/logger/logger.js";
import { IVideoService } from "#internal/interfaces/video.service.interface.js";
import { IVideoController } from "./interfaces/video.controller.interface.js";
import { Request, Response } from 'express'

export class VideoController implements IVideoController {
    constructor(private readonly videoService: IVideoService){}

    async uploadVideo(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.body.userId;
            
            if(!req.file){
                return res.status(400).json({ message: "Вы не загрузили Видео" })
            }

            logger.info('📦 Начало загрузки видео для пользователя:', userId);
            logger.info('📄 Файл:', {
                name: req.file!.originalname,
                type: req.file!.mimetype,
                size: req.file!.size
            });

            const allowedExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.wmv'];
            const fileExtension = req.file!.originalname.toLowerCase().slice(
                req.file!.originalname.lastIndexOf('.')
            );
            
            if (!allowedExtensions.includes(fileExtension)) {
                return res.status(400).json({ error: `Неподдерживаемый формат файла. Разрешены: ${allowedExtensions.join(', ')}` });
            }

            const MAX_SIZE = 500 * 1024 * 1024;
            
            if (req.file!.size > MAX_SIZE) {
                return res.status(400).json({ error: `Файл слишком большой. Максимум: ${MAX_SIZE / 1024 / 1024}MB` });
            }

            const result = await this.videoService.uploadVideo(userId, req.file!)

            logger.info('✅ Видео успешно загружено для пользователя:', userId);

            return res.status(201).json({
                success: true,
                message: 'Видео успешно загружено',
                data: {
                    videoId: result.videoId,
                    url: result.url,
                    filename: result.filename,
                    originalName: req.file!.originalname,
                    size: req.file!.size,
                    sizeMB: (req.file!.size / 1024 / 1024).toFixed(2) + 'MB',
                    userId: userId
                }
            })

        } catch (error) {
            logger.error('💥 Upload error:', error)
            
            const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
            
            if (errorMessage.includes('большой') || errorMessage.includes('размер')) {
                return res.status(400).json({ error: errorMessage })
            }
            
            if (errorMessage.includes('S3') || errorMessage.includes('bucket')) {
                return res.status(500).json({ error: 'Ошибка загрузки в облачное хранилище', details: errorMessage })
            }

            return res.status(500).json({ error: 'Ошибка загрузки видео', message: errorMessage})
        }
    }

    async getVideos(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            
            if (!id) {
                return res.status(401).json({ message: 'Не передан id' })
            }

            const videos = await this.videoService.getUserVideos(id)
            
            logger.info("Videos", videos)

            return res.json({ success: true, count: videos?.length, data: videos })

        } catch (error) {
            logger.error('Ошибка при получении видео', error)
            return res.status(500).json({ error: 'Ошибка получения видео' })
        }
    }

    async deleteVideo(req: Request, res: Response): Promise<Response>{
        try {
            const { userId, videoId } = req.params

            if(!userId || !videoId){
                return res.status(401).json({ message: "не передан userId или videoId" })
            }

            await this.videoService.deleteVideo(userId, videoId)

            return res.json({ message: "Видео было успешно удалено" })

        } catch (error) {
            return res.status(500).json({ error: "Ошибка удаления видео" })
        }
    }
}
