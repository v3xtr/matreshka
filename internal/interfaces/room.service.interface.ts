import { Room } from "src/prisma/client.js"

export interface IRoomService{
    getOrCreatePrivateRoom(userA: string, userB: string): Promise<string>
    getUserRooms(userId: string): Promise<Room[]>
}
