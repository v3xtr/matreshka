import z from 'zod'

export const CommentRequest = z.object({
    videoId: z.string(),
    userId: z.string(),
    parentId: z.optional(z.string()),
    text: z.string().max(250, "Вы привысили допустимое количество символов")
})

export type CommentRequestType = z.infer<typeof CommentRequest>
