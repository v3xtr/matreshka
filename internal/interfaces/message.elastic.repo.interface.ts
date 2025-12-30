import { Message } from "src/prisma/client.js"

export interface IMessageElasticRepo{
    indexMessage(message: Message): Promise<void>
    searchMessages(roomId: string, query: string): Promise<Message[]> 
}
