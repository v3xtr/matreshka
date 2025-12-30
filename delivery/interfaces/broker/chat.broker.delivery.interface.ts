import { Channel } from "amqplib";

export interface IRabbitConsumer{
    startConsumer(channel: Channel): Promise<void>
}
