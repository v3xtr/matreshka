import { z } from 'zod'

export const VerificationRequest = z.object({
    code: z.string().length(6)
})