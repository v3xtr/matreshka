import { createClient, RedisClientType } from 'redis'
import { logger } from '../logger/logger.js'

export const redisClient: RedisClientType = createClient({
    url: process.env.REDIS_URL as string,
})

export async function connectRedis(): Promise<void> {
    try {
        await redisClient.connect()
        logger.info("Successfully connected to Redis")
    } catch (err) {
        logger.error("Redis connection failed: ", err)
    }
}

redisClient.on('error', (err: Error) => {
    logger.error("Redis connection error: ", err)
})
