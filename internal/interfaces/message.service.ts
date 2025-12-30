import { Message } from "src/prisma/client.js"

export interface IMessageService{
    execute(input: {
        roomId: string
        userId: string
        text: string
      }): Promise<Message>
}
