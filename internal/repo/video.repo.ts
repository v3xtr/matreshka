import { IVideoRepo } from "#internal/interfaces/video.repo.interface.js";
import { PrismaClient } from "@prisma/client/extension";
import { Video, VideoStatus } from "src/prisma/index.js";

export class VideoRepo implements IVideoRepo {

    constructor(private readonly prisma: PrismaClient){}

    async create(data: {
        userId: string
        originalName: string
        fileName: string
        s3Key: string
        url: string
        cdnUrl: string,
        size: number
        mimeType: string
        duration?: number
        resolution?: string
        status?: VideoStatus
    }): Promise<Video> {
        return await this.prisma.video.create({
            data: {
                ...data,
                status: data.status || VideoStatus.UPLOADING
            }
        })
    }

    async findById(id: string): Promise<Video | null> {
        return await this.prisma.video.findUnique({
            where: { id }
        })
    }

    async findByUserId(userId: string): Promise<Video[]> {
        return await this.prisma.video.findMany({
            where: { 
                userId,
                status: { not: VideoStatus.DELETED }
            },
            orderBy: { createdAt: 'desc' }
        })
    }

    async updateStatus(id: string, status: VideoStatus): Promise<Video> {
        return await this.prisma.video.update({
            where: { id },
            data: { 
                status,
                ...(status === VideoStatus.READY && { processedAt: new Date() })
            }
        })
    }

    async getUserStats(userId: string) {
        const [totalSize, videoCount] = await Promise.all([
            this.prisma.video.aggregate({
                where: {
                    userId,
                    status: { not: VideoStatus.DELETED }
                },
                _sum: { size: true }
            }),
            this.prisma.video.count({
                where: {
                    userId,
                    status: { not: VideoStatus.DELETED }
                }
            })
        ])

        return {
            totalSize: totalSize._sum.size || 0,
            videoCount
        }
    }

    async deleteVideo(id: string): Promise<Video> {
        return await this.prisma.video.update({
            where: { id },
            data: { 
                status: VideoStatus.DELETED
            }
        })
    }
}
