import { Message, RoomMember } from "src/prisma/client.js"

export interface IMessageRepo{
    create(input: {
            roomId: string
            userId: string
            text: string
        }): Promise<Message>

      findByRoom(roomId: string, limit?: number): Promise<Message[]>
      setReadStatus(roomId: string, userId: string): Promise<RoomMember>
}
