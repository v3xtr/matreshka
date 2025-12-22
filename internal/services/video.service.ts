import { logger } from "#internal/adapter/logger/logger.js";
import { IVideoRepo } from "#internal/interfaces/video.repo.interface.js";
import { IVideoService } from "#internal/interfaces/video.service.interface.js";
import { S3, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Video } from "src/prisma/index.js";
import { v4 as uuid } from "uuid";

export class VideoService implements IVideoService {
  constructor(
    private readonly s3: S3,
    private readonly videoRepository: IVideoRepo
  ) {}

  async uploadVideo(userId: string, file: Express.Multer.File, onProgress?: (progress: number) => void): Promise<{ url: string; filename: string; videoId: string }> {
    const filename = uuid();
    const key = `videos/${userId}/${filename}`;

    const cdnUrl = `${process.env.CDN_URL}/${key}`
    const rawUrl = `${process.env.AWS_BUCKET_URL}/${process.env.AWS_BUCKET_NAME}/${key}`;

    const video: Video = await this.videoRepository.create({
      userId,
      originalName: file.originalname,
      fileName: filename,
      s3Key: key,
      size: file.size,
      mimeType: file.mimetype,
      status: "UPLOADING",
      url: rawUrl,
      cdnUrl,
    });

    try {
      const upload = new Upload({
        client: this.s3,
        params: {
          Bucket: process.env.AWS_BUCKET_NAME!,
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

        upload.on("httpUploadProgress", progress => {
          if (!progress.total) return;

          const percent = Math.floor(
            (progress.loaded! / progress.total) * 100
          );

          if (percent !== lastPercent) {
            lastPercent = percent;
            onProgress(percent);
          }
        });
      }

      await upload.done();

      await this.videoRepository.updateStatus(video.id, "READY");

      logger.info("Видео успешно загружено", {
        videoId: video.id,
        userId,
        key,
        sizeMB: (file.size / 1024 / 1024).toFixed(2),
      });

      return { url: cdnUrl, filename, videoId: video.id };
    } catch (error) {
      logger.error("Ошибка загрузки видео", {
        videoId: video.id,
        userId,
        error,
      });

      await this.videoRepository.updateStatus(video.id, "FAILED");

      try {
        await this.s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
          })
        );
      } catch (cleanupError) {
        logger.error("Не удалось удалить видео после ошибки", {
          videoId: video.id,
          cleanupError,
        });
      }

      throw new Error("Не удалось загрузить видео");
    }
  }

  async getUserVideos(userId: string): Promise<Video[] | null> {
    const videos = await this.videoRepository.findByUserId(userId);
    return videos.filter(v => v.status === "READY");
  }

  async deleteVideo(userId: string, videoId: string): Promise<void> {
    const video = await this.videoRepository.findById(videoId);

    if (!video || video.userId !== userId) {
      throw new Error("Видео не найдено или доступ запрещён");
    }

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: video.s3Key,
      })
    );

    await this.videoRepository.updateStatus(videoId, "DELETED");

    logger.info("Видео удалено", { videoId, userId });
  }
}
