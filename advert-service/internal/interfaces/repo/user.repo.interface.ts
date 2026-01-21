import { User } from "src/prisma/client.js";

export interface IUserRepo{
    create(data: User): Promise<User>
}
