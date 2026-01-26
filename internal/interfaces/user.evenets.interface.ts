import { User } from "../../src/prisma/index.js";

export interface IUserEvenets{
    sendToQueue(user: User): Promise<void>
}
