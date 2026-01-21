import { TypeUserWithoutPassword } from "#internal/types/user.type.js";
import { UpdateProfileRequest } from "#internal/validation/profile.validation.js";
import { User } from "prisma-client-5d51da62b1e4dd56abbf19514e1b3f29771dbc3b40eee433caeb6d62019551eb";

export interface IProfileService{
    getUser(id: string): Promise<TypeUserWithoutPassword | null>
    createUser(user: User): Promise<User>
    updateUser(user: UpdateProfileRequest): Promise<TypeUserWithoutPassword>
    updateAvatar(id: string, avatarBase64: string): Promise<string> 
}
