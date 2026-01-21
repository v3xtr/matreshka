import { logger } from "#internal/adapter/logger/logger.js";
import { IMediaRepo } from "#internal/interfaces/media.repo.interface.js";
import { S3 } from 'aws-sdk'
import { Media } from "src/prisma/index.js";
import { StoreMediaRequestType } from "#internal/validation/media.validation.js";
import { IMediaEvents } from "#internal/interfaces/media.events.interface.js";
import { IMediaService } from "#internal/interfaces/media.service.interface.js";

class MediaService implements IMediaService {
  constructor(
    private readonly s3: S3,
    private readonly mediaRepo: IMediaRepo,
    private readonly mediaEvents: IMediaEvents
  ) {}

  getPresignedUrl(fileName: string, contentType: any): string{
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        ContentType: contentType,
        ExpiresIn: 300,
      }

      const mediaUrl: string = this.s3.getSignedUrl("getObject", params)

      return mediaUrl
    }catch (error){
      logger.error("getPresignedUrlError: ", error);
      return "internal server error"
    }
  }

  async storeMedia(mediaArray: StoreMediaRequestType[]): Promise<Media[]> {
    const createPromises = mediaArray.map(async (mediaData) => {
      const cdnUrl: string = `${process.env.CDN_URL}/${mediaData.s3Key}`

      const createdMedia: Media = await this.mediaRepo.create(mediaData, cdnUrl)

      await this.mediaEvents.sendToQueue(createdMedia)
          .catch(error => {
            logger.error("Failed to send media to queue", {
              mediaId: createdMedia.id,
              error: error.message
            });
          });

      return createdMedia;
    });

    return await Promise.all(createPromises);
  }

  async getUserVideos(userId: string): Promise<Media[] | null> {
    return await this.mediaRepo.findByUserId(userId);
  }

  async deleteVideo(userId: string, videoId: string): Promise<void> {
    const media = await this.mediaRepo.findById(videoId);

    if (!media || media.userId !== userId) {
      throw new Error("Видео не найдено или доступ запрещён");
    }

    try {
      this.s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: media.s3Key
      });

      await this.mediaRepo.deleteMedia(userId);
      logger.info("Видео удалено", { media, userId });

    }catch (error){
      logger.error(`Ошибка Удаления Видео: ${error}`)
    }
  }
}

export default MediaService
