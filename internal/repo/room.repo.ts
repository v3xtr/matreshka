import { PrismaClient, Room } from "src/prisma/client.js";
import { IRoomRepo } from "#internal/interfaces/room.repo.interface.js";

export class RoomRepo implements IRoomRepo {
  constructor(private readonly prisma: PrismaClient) {}

  async exists(roomId: string): Promise<boolean> {
    return !!(await this.prisma.room.findUnique({
      where: { id: roomId },
      select: { id: true },
    }));
  }

  async create(roomId: string, userIds: string[]): Promise<void> {
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true },
    });
    if (users.length !== userIds.length) throw new Error("Some users not found");

    await this.prisma.room.create({
      data: {
        id: roomId,
        users: { connect: userIds.map(id => ({ id })) },
      },
    });
  }

  async findByUser(userId: string): Promise<Room[]> {
    return this.prisma.room.findMany({
      where: { users: { some: { id: userId } } },
      include: {
        users: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
