import { User } from "src/prisma";

export interface IVideoService{
    createUser(data: User): Promise<User>
}
