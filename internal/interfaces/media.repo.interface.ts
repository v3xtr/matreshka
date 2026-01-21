import { Media } from "src/prisma/index.js";
import { StoreMediaRequestType } from "#internal/validation/media.validation.js";

export interface IMediaRepo {
    create(MediaData: StoreMediaRequestType, cdnUrl: string): Promise<Media>

    findById(id: string): Promise<Media | null>
    
    findByUserId(userId: string): Promise<Media[]>

    deleteMedia(id: string): Promise<Media>
}
