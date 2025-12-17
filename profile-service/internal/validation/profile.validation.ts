import { z } from "zod";

export const GetProfileSchema = z.object({
    id: z.string()
})

export const UpdateProfileSchema = z.object({
    id: z.string().optional(),
    email: z.string(),
    phone: z.string(),
    name: z.string(),
    city: z.string(),
    description: z.string()
})

export type ProfileSchemaRequest = z.infer<typeof GetProfileSchema>
export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>
