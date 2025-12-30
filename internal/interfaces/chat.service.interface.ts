import { Message } from "src/prisma/client.js"

export interface IChatService{
    getOrCreatePrivateRoom(userA: string, userB: string): Promise<string>
    getMessages(roomId: string): Promise<Message[]>
    searchMessages(roomId: string, query: string): Promise<Message[]>
}
