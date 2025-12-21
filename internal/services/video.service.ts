import { logger } from "#internal/adapter/logger/logger.js";
import { IVideoRepo } from "#internal/interfaces/video.repo.interface.js";
import { IVideoService } from "#internal/interfaces/video.service.interface.js";
import { S3 } from "@aws-sdk/client-s3";
import { Upload } from '@aws-sdk/lib-storage';
import { v4 } from 'uuid';

export class VideoService implements IVideoService {
    constructor(
        private readonly s3: S3,
        private readonly videoRepository: IVideoRepo
    ) {}

    async uploadVideo(userId: string, file: Express.Multer.File, onProgress?: (progress: number) => void): Promise<{ url: string; filename: string; videoId: string }> {
        const filename = v4();
        const key = `videos/${userId}/${filename}`;

        const parallelUpload = new Upload({
            client: this.s3,
            params: {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            },
            queueSize: 3,
            partSize: 5 * 1024 * 1024,
            leavePartsOnError: false,
        });

        if (onProgress) {
            let lastPercent = 0;
            parallelUpload.on('httpUploadProgress', progress => {
                if (progress.total) {
                    const percent = Math.floor((progress.loaded! / progress.total!) * 100);
                    if (percent !== lastPercent) {   // вызываем только при изменении процента
                        lastPercent = percent;
                        onProgress(percent);
                    }
                }
            });
        }

        await parallelUpload.done();

        const url = `${process.env.AWS_BUCKET_URL}/${process.env.AWS_BUCKET_NAME}/${key}`;
        const cdnUrl = `${process.env.CDN_URL}/${key}`;

        const video = await this.videoRepository.create({
            userId,
            originalName: file.originalname,
            fileName: filename,
            s3Key: key,
            cdnUrl,
            url,
            size: file.size,
            mimeType: file.mimetype,
            status: 'UPLOADING',
        });

        await this.videoRepository.updateStatus(video.id, 'READY');

        logger.info("Видео загружено", {
            videoId: video.id,
            bucket: process.env.AWS_BUCKET_NAME,
            key,
            url,
            size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        });

        return {
            url: cdnUrl,
            filename,
            videoId: video.id,
        };
    }

    async getUserVideos(userId: string) {
        const videos = await this.videoRepository.findByUserId(userId);
        return videos.filter(v => v.status === 'READY');
    }

    async deleteVideo(userId: string, videoId: string) {
        const video = await this.videoRepository.findById(videoId);

        if (!video || video.userId !== userId) {
            throw new Error('Видео не найдено или доступ запрещен');
        }

        await this.s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: video.s3Key,
        });

        await this.videoRepository.updateStatus(videoId, 'DELETED');
    }
}
