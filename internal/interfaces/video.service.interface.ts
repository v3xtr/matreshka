import { Video } from "src/prisma/index.js";

export interface IVideoService {
    uploadVideo(userId: string, file: Express.Multer.File, onProgress?: (progress: number) => void): Promise<{
        url: string;
        filename: string;
        videoId: string;
    }>;

    getUserVideos(userId: string): Promise<Video[] | null> 

    deleteVideo(userId: string, videoId: string): Promise<void>;
}
