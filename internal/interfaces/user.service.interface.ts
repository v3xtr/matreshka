import { User } from "src/prisma/client.js";

export interface IUserService{
    createUser(data: User): Promise<User>
}
