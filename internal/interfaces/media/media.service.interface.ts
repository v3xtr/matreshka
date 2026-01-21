import { Media } from 'src/prisma/index.js'

export interface IMediaService {
    processMedia(data: Media): Promise<Media>
}