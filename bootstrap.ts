import { Channel } from 'amqplib'
import { connectRedis } from './internal/adapter/redis/redis.js'
import { logger } from './internal/adapter/logger/logger.js'
import { RabbitConnection } from './internal/adapter/rabbit/rabbit.js'
import { RabbitUserConsumer } from '#delivery/broker/user.consumer.js'
import { RabbitVideoConsumer } from '#delivery/broker/video.consumer.js'

export async function bootstrap(){
    try {
        const rabbit = new RabbitConnection()
        const userConsumer = new RabbitUserConsumer()
        const videoConsumer = new RabbitVideoConsumer()

        const channel: Channel = await rabbit.connect()

        userConsumer.startConsumer(channel)
        videoConsumer.startConsumer(channel)
        logger.info("Слушатель брокера запущен")

        connectRedis().catch(logger.error)
    } catch (error) {
        if (error instanceof AggregateError) {
            console.error("AggregateError caught:");
            for (const e of error.errors) {
                console.error(e); 
            }
        } else {
            console.error(error);
        }
    }
}
