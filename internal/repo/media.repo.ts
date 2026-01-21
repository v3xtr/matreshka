import { PrismaClient } from "@prisma/client/extension";
import { Media } from "src/prisma/index.js";
import { StoreMediaRequestType } from "#internal/validation/media.validation.js";
import { IMediaRepo } from "#internal/interfaces/media.repo.interface.js";

export class MediaRepo implements IMediaRepo {

    constructor(private readonly prisma: PrismaClient){}

    create(videoData: StoreMediaRequestType, cdnUrl: string): Promise<Media> {
        return this.prisma.media.create({
            data: {
                ...videoData,
                cdnUrl
            },
        })
    }

    findById(id: string): Promise<Media | null> {
        return this.prisma.media.findUnique({
            where: { id }
        })
    }

    findByUserId(userId: string): Promise<Media[]> {
        return this.prisma.media.findMany({
            where: { 
                userId,
                type: 'video'
            },
            orderBy: { createdAt: 'desc' }
        })
    }

    deleteMedia(id: string): Promise<Media> {
        return this.prisma.media.delete({
            where: { id }
        })
    }
}
