import { User } from "src/prisma/index.js";

export interface IUserService{
    createUser(data: User): Promise<User>
}
