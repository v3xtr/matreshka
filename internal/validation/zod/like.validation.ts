import z from 'zod'

export const LikeRequest = z.object({
    videoId: z.string(),
    userId: z.string(),
})


export type LikeRequestType = z.infer<typeof LikeRequest>
