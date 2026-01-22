import { logger } from "#internal/adapter/logger/logger.js";
import { Channel, ConsumeMessage } from "amqplib";

export type QueueConfig = {
    exchange: string;
    queue: string;
    retryQueue: string;
    dlq: string;
    retryLimit: number;
    retryTtl: number;
    serviceName: string;
}

export async function setupRabbitQueue(channel: Channel, config: QueueConfig): Promise<void> {
    await channel.assertExchange(config.exchange, "fanout", { durable: true });

    await channel.assertQueue(config.queue, {
        durable: true,
        arguments: {
            "x-dead-letter-exchange": "",
            "x-dead-letter-routing-key": config.retryQueue
        }
    });

    await channel.assertQueue(config.retryQueue, {
        durable: true,
        arguments: {
            "x-message-ttl": config.retryTtl,
            "x-dead-letter-exchange": "",
            "x-dead-letter-routing-key": config.queue
        }
    });

    await channel.assertQueue(config.dlq, { durable: true });
    await channel.bindQueue(config.queue, config.exchange, "");
    await channel.prefetch(1);

    logger.info(`${config.serviceName} Rabbit consumer started`);
}

export function createMessageHandler(
    config: QueueConfig,
    handler: (data: any) => Promise<void>
) {
    return async (channel: Channel, msg: ConsumeMessage | null): Promise<void> => {
        if (!msg) return;

        const retryCount = (msg.properties.headers?.["x-retry-count"] as number) ?? 0;
        const receivedAt = new Date().toISOString();

        try {
            const data = JSON.parse(msg.content.toString());

            logger.info(`${config.serviceName} message received`, {
                id: data.id,
                retryCount,
                receivedAt
            });

            console.log(`[${receivedAt}] ${config.serviceName}: `, data);

            await handler(data);

            channel.ack(msg);
            logger.info(`${config.serviceName} message processed`, {
                id: data.id,
                processedAt: new Date().toISOString()
            });

        } catch (error) {
            logger.error(`${config.serviceName} processing failed`, {
                error: error instanceof Error ? error.message : error,
                retryCount,
                receivedAt
            });

            if (retryCount >= config.retryLimit) {
                channel.sendToQueue(config.dlq, msg.content, {
                    persistent: true,
                    headers: {
                        ...msg.properties.headers,
                        "x-error": error instanceof Error ? error.message : "unknown"
                    }
                });
                channel.ack(msg);
                return;
            }

            channel.sendToQueue(config.retryQueue, msg.content, {
                persistent: true,
                headers: {
                    ...msg.properties.headers,
                    "x-retry-count": retryCount + 1
                }
            });

            channel.ack(msg);
        }
    };
}