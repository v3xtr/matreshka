import { UpdateProfileRequest } from "#internal/validation/profile.validation.js";
import { User } from "src/prisma/index.js";

export interface IProfileRepo{
    get(id: string): Promise<User | null>
    create(data: User): Promise<User>
    update(user: UpdateProfileRequest): Promise<User>
    updateAvatar(id: string, avatarUrl: string): Promise<User>
}
