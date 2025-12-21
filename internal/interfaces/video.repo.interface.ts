import { Video, VideoStatus } from "src/prisma/index.js";

export interface IVideoRepo {
    create(data: {
        userId: string
        originalName: string
        fileName: string
        s3Key: string
        url: string
        size: number
        mimeType: string
        duration?: number
        resolution?: string
        status?: VideoStatus
    }): Promise<Video>

    findById(id: string): Promise<Video | null>
    
    findByUserId(userId: string): Promise<Video[]>
    
    updateStatus(id: string, status: VideoStatus): Promise<Video>
    
    deleteVideo(id: string): Promise<Video>
    
    getUserStats(userId: string): Promise<{
        totalSize: number
        videoCount: number
    }>
}
