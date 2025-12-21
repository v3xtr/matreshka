import { Request, Response, NextFunction } from "express";
import Busboy from 'busboy';

export function uploadVideoMiddleware (req: Request, res: Response, next: NextFunction){
    const busboy = Busboy({ 
        headers: req.headers,
        limits: { fileSize: 500 * 1024 * 1024 }
    });

    const fields: Record<string, string> = {};
    let fileBuffer: Buffer | null = null;
    let fileInfo: { filename: string; mimeType: string } | null = null;

    busboy.on('field', (fieldname, val) => {
        fields[fieldname] = val;
    });

    busboy.on('file', (fieldname, file, info) => {
        const { filename, mimeType } = info;
        fileInfo = { filename, mimeType };

        const chunks: Buffer[] = [];
        file.on('data', chunk => chunks.push(chunk));
        file.on('end', () => fileBuffer = Buffer.concat(chunks));
        file.on('error', err => next(err));
    });

    busboy.on('finish', () => {
        if (!fields.userId) return res.status(400).json({ error: 'Поле userId обязательно' });
        if (!fileBuffer || !fileInfo) return res.status(400).json({ error: 'Файл video обязателен' });

        (req as any).file = {
            fieldname: 'video',
            originalname: fileInfo.filename,
            encoding: '7bit',
            mimetype: fileInfo.mimeType,
            buffer: fileBuffer,
            size: fileBuffer.length
        };

        req.body = { userId: fields.userId };

        next();
    });

    busboy.on('error', (err: any) => {
        if (err.message.includes('file size')) return res.status(400).json({ error: 'Файл слишком большой. Максимум 500MB' });
        next(err);
    });

    req.pipe(busboy);
};
