import { Channel } from 'amqplib'
import { logger } from './internal/adapter/logger/logger.js'
import { RabbitConnection } from './internal/rabbit/rabbit.js'
import { RabbitConsumer } from './delivery/broker/rabbit.broker.js'

export async function bootstrap() {
    try {
        const rabbit = new RabbitConnection()
        const consumer = new RabbitConsumer()

        const channel: Channel = await rabbit.connect()
        logger.info("Брокер подключился")

        consumer.startConsumer(channel)
        logger.info("Слушатель брокера запущен")
    } catch (error) {
        logger.error(`Брокер упал с ошибкой ${error}`)
    }

}
