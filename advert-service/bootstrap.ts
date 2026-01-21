import { RabbitConnection } from './internal/adapter/rabbit/rabbit.js'
import { RabbitUserConsumer } from './delivery/broker/user.consumer.js'
import { RabbitVideoConsumer } from './delivery/broker/video.consumer.js'
import { Channel } from 'amqplib'
import { logger } from './internal/adapter/logger/logger.js'

export async function bootstrap() {
    try {
        const rabbit = new RabbitConnection()
        const userConsumer = new RabbitUserConsumer()
        const videoConsumer = new RabbitVideoConsumer()

        const channel: Channel = await rabbit.connect()
        logger.info("Брокер подключился")

        userConsumer.startConsumer(channel)
        logger.info("Слушатель брокера юзера запущен")

        videoConsumer.startConsumer(channel)
        logger.info("Слушатель брокера видео запущен")
    } catch (error) {
        logger.error(`Брокер упал с ошибкой ${error}`)
    }

}
