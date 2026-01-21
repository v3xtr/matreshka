import { IMessageRepo } from "#internal/interfaces/message.repo.interface.js"
import { IMessageCache } from "#internal/interfaces/message.cache.repo.js"
import { Message, RoomMember } from "src/prisma/client.js"
import { MessageElasticRepo } from "./message.elastic.repo.js"
import { ICachedMessageRepo } from "#internal/interfaces/cahed.message.repo.interface.js";
import { IReadStatusCache } from "#internal/interfaces/read.status.cached.repo.interface.js";

export class CachedMessageRepo implements ICachedMessageRepo {
  constructor(
    private readonly dbRepo: IMessageRepo,
    private readonly cache: IMessageCache,
    private readonly esRepo: MessageElasticRepo,
    private readonly readStatusCache: IReadStatusCache
  ) {}

  async create(input: { roomId: string; userId: string; text: string }): Promise<Message> {
    const message = await this.dbRepo.create(input)

    this.cache.push(message).catch(() => {})
    this.esRepo.indexMessage(message).catch(() => {})

    return message
  }

  async findByRoom(roomId: string, limit = 50): Promise<Message[]> {
    const cached = await this.cache.get(roomId)
    if (cached) return cached

    const messages = await this.dbRepo.findByRoom(roomId, limit)
    await this.cache.set(roomId, messages).catch(() => {})
    return messages
  }

  async search(roomId: string, query: string, limit = 50): Promise<Message[]> {
    return this.esRepo.searchMessages(roomId, query, limit)
  }

  async setReadStatus(roomId: string, userId: string): Promise<RoomMember> {
    await this.readStatusCache.setLastRead(roomId, userId, Date.now())

    return this.dbRepo.setReadStatus(roomId, userId)
  }

}
