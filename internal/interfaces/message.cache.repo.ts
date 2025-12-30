import { Message } from "src/prisma/client.js"

export interface IMessageCache{
    get(roomId: string): Promise<Message[] | null>
    set(roomId: string, messages: Message[]): Promise<void>
    push(message: Message): Promise<void>
    invalidate(roomId: string): Promise<void>
}
