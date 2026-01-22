import { RabbitConnection } from './internal/adapter/rabbit/rabbit.js'

import { Channel } from 'amqplib'
import { logger } from './internal/adapter/logger/logger.js'
import {BrokerUserConsumer} from "./delivery/broker/user.consumer";
import { BrokerVideoConsumer } from "./delivery/broker/video.consumer";

export async function bootstrap() {
    try {
        const rabbit = new RabbitConnection()
        const userConsumer = new BrokerUserConsumer()
        const videoConsumer = new BrokerVideoConsumer()

        const channel: Channel = await rabbit.connect()
        logger.info("Брокер подключился")

        await userConsumer.startConsumer(channel)
        logger.info("Слушатель брокера юзера запущен")

        await videoConsumer.startConsumer(channel)
        logger.info("Слушатель брокера видео запущен")
    } catch (error) {
        logger.error(`Брокер упал с ошибкой ${error}`)
    }

}
