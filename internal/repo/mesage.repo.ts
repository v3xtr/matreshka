import { IMessageRepo } from "#internal/interfaces/message.repo.interface.js"
import { Message, PrismaClient } from "src/prisma/client.js"

export class MessageRepo implements IMessageRepo {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: {
    roomId: string
    userId: string
    text: string
  }): Promise<Message> {
    return this.prisma.message.create({
      data: {
        roomId: input.roomId,
        userId: input.userId,
        text: input.text,
      },
    })
  }

  async findByRoom(roomId: string, limit = 50): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: "desc" },
      take: limit,
    })
  }
}
