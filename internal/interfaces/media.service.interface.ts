import { Media } from "src/prisma/index.js";
import { StoreMediaRequestType } from "#internal/validation/media.validation.js";

export interface IMediaService {
    getPresignedUrl(fileName: string, contentType: any): string
    storeMedia(mediaArray: StoreMediaRequestType[]): Promise<Media[]>
    getUserVideos(userId: string): Promise<Media[] | null>
    deleteVideo(userId: string, videoId: string): Promise<void>
}
