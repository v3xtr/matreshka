import { IUserRepo } from "#internal/interfaces/user.repo.interface.js";
import { IUserService } from "#internal/interfaces/user.service.interface.js";
import { User } from "src/prisma/client.js";

export class UserService implements IUserService{
    constructor(private readonly userRepo: IUserRepo){}

    async createUser(data: User): Promise<User>{
        return this.userRepo.create(data)
    }
}
