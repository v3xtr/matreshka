import { z } from 'zod'

export const StoreMediaRequestSchema = z.array(
    z.object({
        userId: z.string(),
        filename: z.string(),
        s3Key: z.string(),
        url: z.string(),
        mimeType: z.string(),
        title: z.string().optional(),
        description: z.string().optional()
    })
).min(1, "Должен быть хотя бы один медиа файл");


export const DeleteMediaRequestSchema = z.object({
    userId: z.string(),
    videoId: z.string()
})

export const GetVideosRequestSchema = z.object({
    id: z.string()
})

export type StoreMediaRequestType = z.infer<typeof StoreMediaRequestSchema>[0];
