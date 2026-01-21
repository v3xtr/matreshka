import { Channel } from "amqplib";

export interface IRabbitUserConsumer{
    startConsumer(channel: Channel): Promise<void>
}
