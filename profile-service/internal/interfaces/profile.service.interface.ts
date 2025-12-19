import { TypeUserWithoutPassword } from "#internal/types/user.type.js";
import { UpdateProfileRequest } from "#internal/validation/profile.validation.js";
import { User } from "src/prisma/index.js";

export interface IProfileService{
    getUser(id: string): Promise<TypeUserWithoutPassword | null>
    createUser(user: User): Promise<User>
    updateUser(user: UpdateProfileRequest): Promise<TypeUserWithoutPassword>}
