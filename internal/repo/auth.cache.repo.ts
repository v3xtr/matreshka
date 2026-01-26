import { IAuthCacheRepo } from "../interfaces/verification.cache.repo.js";
import { RedisClientType } from "redis";

export class AuthCacheRepo implements IAuthCacheRepo{
    constructor(private readonly redis: RedisClientType) { }

    async storeCode(userId: string, code: string): Promise<number>{
        return await this.redis.lPush(userId, code)
    }

    async getCode(userId: string): Promise<string | null>{
        return await this.redis.get(userId)
    }
}