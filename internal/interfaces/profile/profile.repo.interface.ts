import { UpdateProfileRequest } from "#internal/validation/profile.validation.js";
import { User } from "prisma-client-5d51da62b1e4dd56abbf19514e1b3f29771dbc3b40eee433caeb6d62019551eb";

export interface IProfileRepo{
    get(id: string): Promise<User | null>
    create(data: User): Promise<User>
    update(user: UpdateProfileRequest): Promise<User>
    updateAvatar(id: string, avatarUrl: string): Promise<User>
}
