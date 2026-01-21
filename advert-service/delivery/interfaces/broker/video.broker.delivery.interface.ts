import { Channel } from "amqplib";

export interface IRabbitVideoConsumer{
    startConsumer(channel: Channel): Promise<void>
}
