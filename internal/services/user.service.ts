import { IUserRepo } from "#internal/interfaces/user.repo.interface.js";
import { User } from "src/prisma/index.js";
import { IUserService } from "../interfaces/user.service.interface.js";

export class UserService implements IUserService{
    constructor (private readonly userRepo: IUserRepo){}

    async createUser(data: User): Promise<User>{
        return await this.userRepo.create(data)
    }

}
