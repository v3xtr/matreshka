import { IReadStatusCache } from "#internal/interfaces/read.status.cached.repo.interface.js"
import { RedisClientType } from "redis"

export class ReadStatusCache implements IReadStatusCache {
  constructor(private readonly redis: RedisClientType) {}

  #key(roomId: string, userId: string) {
    return `chat:room:${roomId}:user:${userId}:lastReadAt`
  }

  async setLastRead(roomId: string, userId: string, timestamp: number) {
    await this.redis.set(
      this.#key(roomId, userId),
      timestamp.toString()
    )
  }

  async getLastRead(roomId: string, userId: string) {
    const value = await this.redis.get(this.#key(roomId, userId))
    return value ? Number(value) : null
  }
}
