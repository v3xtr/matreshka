import { User } from "src/prisma";

export interface IVideoRepo{
    createUser(data: User): Promise<User>
}
