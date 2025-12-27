import { User } from "src/prisma/client.js";

export interface IUserEvenets{
 sendToQueue(user: User): Promise<void>   
}
