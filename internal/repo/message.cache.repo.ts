import { IMessageCache } from "#internal/interfaces/message.cache.repo.js"
import { RedisClientType } from "redis"
import { Message, RoomMember } from "src/prisma/client.js"

export class MessageCache implements IMessageCache {
  constructor(private readonly redis: RedisClientType) {}

   #key(roomId: string) {
    return `chat:room:${roomId}:messages`
  }

  async get(roomId: string): Promise<Message[] | null> {
    const data = await this.redis.lRange(this.#key(roomId), 0, -1)
    if (!data.length) return null

    return data.map((m: any) => JSON.parse(m))
  }

  async set(roomId: string, messages: Message[]): Promise<void> {
    const key = this.#key(roomId)

    await this.redis.del(key)
    for (const msg of messages.reverse()) {
      await this.redis.lPush(key, JSON.stringify(msg))
    }

    await this.redis.lTrim(key, 0, 49)
    await this.redis.expire(key, 60 * 60)
  }

  async push(message: Message): Promise<void> {
    const key = this.#key(message.roomId)

    await this.redis.lPush(key, JSON.stringify(message))
    await this.redis.lTrim(key, 0, 49)
    await this.redis.expire(key, 60 * 60)
  }

  async invalidate(roomId: string): Promise<void>{
    await this.redis.del(this.#key(roomId))
  }
}
