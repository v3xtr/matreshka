import { router } from "#internal/adapter/router/router.js";
import Busboy from 'busboy';
import { VideoController } from "../video.controller.js";
import { VideoService } from "#internal/services/video.service.js";
import { VideoRepo } from "#internal/repo/video.repo.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { s3 } from "#internal/adapter/bucket/bucket.js";
import { Request, Response, NextFunction } from 'express';

const videoRepo = new VideoRepo(prisma)
const videoService = new VideoService(s3, videoRepo)
const videoController = new VideoController(videoService)

const handleUploadWithBusboy = (req: Request, res: Response, next: NextFunction) => {
    const busboy = Busboy({ 
        headers: req.headers,
        limits: {
            fileSize: 500 * 1024 * 1024
        }
    });
    
    const fields: Record<string, string> = {};
    let fileBuffer: Buffer | null = null;
    let fileInfo: { filename: string; mimeType: string } | null = null;
    
    busboy.on('field', (fieldname: string, val: string) => {
        fields[fieldname] = val;
    });
    
    busboy.on('file', (fieldname: string, file: any, info: any) => {
        const { filename, mimeType } = info;
        fileInfo = { filename, mimeType };
        
        const chunks: Buffer[] = [];
        file.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });
        
        file.on('end', () => {
            fileBuffer = Buffer.concat(chunks);
        });
        
        file.on('error', (err: Error) => {
            next(err);
        });
    });
    
    busboy.on('finish', () => {
        try {
            if (!fields.userId) {
                return res.status(400).json({ error: 'Поле userId обязательно' });
            }
            
            if (!fileBuffer || !fileInfo) {
                return res.status(400).json({ error: 'Файл video обязателен' });
            }
            
            (req as any).file = {
                fieldname: 'video',
                originalname: fileInfo.filename,
                encoding: '7bit',
                mimetype: fileInfo.mimeType,
                buffer: fileBuffer,
                size: fileBuffer.length
            };
            
            req.body = { userId: fields.userId };
            
            videoController.uploadVideo(req, res).catch(next);
            
        } catch (error) {
            next(error);
        }
    });
    
    busboy.on('error', (err: Error) => {
        if (err.message.includes('file size')) {
            return res.status(400).json({ 
                error: 'Файл слишком большой. Максимум 500MB' 
            });
        }
        next(err);
    });
    
    req.pipe(busboy);
};

router.post("/upload", handleUploadWithBusboy);

export default router;
