import { Channel } from "amqplib"
import { connectRedis } from "./internal/adapter/redis/redis.js"
import { logger } from "./internal/adapter/logger/logger.js"
import { RabbitConnection } from "./internal/adapter/rabbit/rabbit.js"
import { RabbitUserConsumer } from "./delivery/broker/user.consumer.js"

export async function bootstrap() {
  try {
    const rabbit = new RabbitConnection()
    const userConsumer = new RabbitUserConsumer()

    const channel: Channel = await rabbit.connect()
    await userConsumer.startConsumer(channel)

    logger.info("Rabbit consumer started")

    await connectRedis()

    logger.info("Container initialized")
    logger.info("Chat service bootstrap completed")
  } catch (error) {
    if (error instanceof AggregateError) {
      logger.error("AggregateError caught")
      for (const e of error.errors) {
        logger.error(e)
      }
    } else {
      logger.error(error)
    }
    process.exit(1)
  }
}
