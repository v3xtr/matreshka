import { User } from "src/prisma/index.js";

export interface IAuthRepo{
    createUser(data: User): Promise<User>
    getUserByLogin(login: string): Promise<User | null>
}
