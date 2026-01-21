import { PrismaClient } from "@prisma/client/extension";
import { IMediaRepo } from '#internal/interfaces/media/media.repo.interface.js'
import { Media } from 'src/prisma/index.js'

export class MediaRepo implements IMediaRepo{
    constructor(private readonly prisma: PrismaClient) { }

    async create(data: Media): Promise<Media>{
        return this.prisma.media.create(data)
    }
}