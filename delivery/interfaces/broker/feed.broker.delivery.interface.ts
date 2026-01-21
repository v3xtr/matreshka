import { Channel } from "amqplib";

export interface IBrokerConsumer{
    startConsumer(channel: Channel): Promise<void> 
}
