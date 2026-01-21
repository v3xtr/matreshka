import { Media } from 'src/prisma/index.js'

export interface IMediaEvents{
    sendToQueue(mediaData: Media): Promise<void>
}
