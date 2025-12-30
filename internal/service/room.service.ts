import { IRoomRepo } from "#internal/interfaces/room.repo.interface.js";
import { IRoomService } from "#internal/interfaces/room.service.interface.js";
import { Room } from "src/prisma/client.js";

export class RoomService implements IRoomService {
  constructor(private readonly roomRepo: IRoomRepo) {}

  async getOrCreatePrivateRoom(userA: string, userB: string): Promise<string> {
    const roomId = [userA, userB].sort().join(":");
    const exists = await this.roomRepo.exists(roomId);
    if (!exists) {
      await this.roomRepo.create(roomId, [userA, userB]);
    }
    return roomId;
  }

  async getUserRooms(userId: string): Promise<Room[]> {
    return this.roomRepo.findByUser(userId);
  }
}
