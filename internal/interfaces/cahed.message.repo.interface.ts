import { Message, RoomMember } from "src/prisma/client.js";

export interface ICachedMessageRepo{
    create(input: { roomId: string; userId: string; text: string }): Promise<Message>
    findByRoom(roomId: string): Promise<Message[]>
    search(roomId: string, query: string): Promise<Message[]>
    setReadStatus(roomId: string, userId: string): Promise<RoomMember>
}
