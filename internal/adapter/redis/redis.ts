import { logger } from "../logger/logger.js";
import { createClient, RedisClientType } from "redis";

export const redisClient: RedisClientType = createClient({
    url: process.env.REDIS_URL as string,
})

export async function connectRedis(): Promise<void>{
    try {
        await redisClient.connect()
        logger.info("Redis connected successfully.")
    }catch (err){
        logger.error(err)
    }
}

redisClient.on("error", (err: Error) => {
    logger.error("Redis connection error: ", err)
})