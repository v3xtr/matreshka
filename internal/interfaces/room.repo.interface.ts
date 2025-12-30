import { Room } from "src/prisma/client.js"

export interface IRoomRepo {
  exists(roomId: string): Promise<boolean>
  create(roomId: string, userIds: string[]): Promise<void>
  findByUser(userId: string): Promise<Room[]>
}
