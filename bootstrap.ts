import { Channel } from 'amqplib'
import { logger } from './internal/adapter/logger/logger.js'
import { BrokerConnection } from "#internal/adapter/broker/broker.js";
import { BrokerConsumer } from "#delivery/broker/broker.js";

export async function bootstrap() {
    try {
        const broker = new BrokerConnection()
        const consumer = new BrokerConsumer()

        const channel: Channel = await broker.connect()
        logger.info("Брокер подключился")

        await consumer.startConsumer(channel)
        logger.info("Слушатель брокера запущен")
    } catch (error) {
        logger.error(`Брокер упал с ошибкой ${error}`)
    }

}
