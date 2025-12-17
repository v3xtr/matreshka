import { IProfileRepo } from "#internal/interfaces/profile.repo.interface.js";
import { IProfileService } from "#internal/interfaces/profile.service.interface.js";
import { TypeUserWithoutPassword } from "#internal/types/user.type.js";
import { UpdateProfileRequest } from "#internal/validation/profile.validation.js";
import { User } from "src/prisma/index.js";

export class ProfileService implements IProfileService{
    constructor(
        private readonly profileRepo: IProfileRepo
    ){}

    async getUser(id: string): Promise<TypeUserWithoutPassword | null>{
        const responseUser = await this.profileRepo.get(id);

        if(!responseUser){
            return null
        }

        const { password, ...safeUser } = responseUser;
        return safeUser;
    }

    async createUser(user: User): Promise<User>{
        return await this.profileRepo.create(user)
    }

    async updateUser(user: UpdateProfileRequest): Promise<TypeUserWithoutPassword>{
        const responseUser = await this.profileRepo.update(user);
        const { password, ...safeUser } = responseUser;
        return safeUser;
    }
}
