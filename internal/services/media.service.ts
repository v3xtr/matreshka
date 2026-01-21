import { IMediaRepo } from '#internal/interfaces/media/media.repo.interface.js'
import { IMediaService } from '#internal/interfaces/media/media.service.interface.js'
import { Media } from 'src/prisma/index.js'

export class MediaService implements IMediaService{
    constructor(private readonly mediaRepo: IMediaRepo) { }

    async processMedia(data: Media): Promise<Media> {
        return await this.mediaRepo.create(data)
    }
}