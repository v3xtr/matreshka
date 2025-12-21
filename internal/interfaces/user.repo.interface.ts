import { User } from "src/prisma/index.js";

export interface IUserRepo{
    create(data: User): Promise<User>
}
