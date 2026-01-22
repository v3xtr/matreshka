import { Channel } from "amqplib";

export interface IBrokerUserConsumer{
    startConsumer(channel: Channel): Promise<void>
}
