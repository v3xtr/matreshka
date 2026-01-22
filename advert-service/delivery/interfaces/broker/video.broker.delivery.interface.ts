import { Channel } from "amqplib";

export interface IBrokerVideoConsumer{
    startConsumer(channel: Channel): Promise<void>
}
