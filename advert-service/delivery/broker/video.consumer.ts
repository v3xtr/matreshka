import { IRabbitVideoConsumer } from "#delivery/interfaces/broker/video.broker.delivery.interface.js";
import { logger } from "#internal/adapter/logger/logger.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { IVideoRepo } from "#internal/interfaces/repo/video.repo.interface.js";
import { IVideoService } from "#internal/interfaces/service/video.service.interface.js";
import { VideoRepo } from "#internal/repo/video.repo.js";
import { VideoService } from "#internal/service/video.service.js";
import { Channel, ConsumeMessage } from "amqplib";

const EXCHANGE = "video.created";
const QUEUE = "video";
const RETRY_QUEUE = "video.retry";
const DLQ = "video.dlq";
const RETRY_LIMIT = 5;
const RETRY_TTL = 5000;


export class RabbitVideoConsumer implements IRabbitVideoConsumer {
    private videoService: IVideoService
    private videoRepo: IVideoRepo

    constructor() {
        this.videoRepo = new VideoRepo(prisma)
        this.videoService = new VideoService(this.videoRepo)
    }

    async startConsumer(channel: Channel): Promise<void> {
        await channel.assertExchange(EXCHANGE, "fanout", { durable: true });

        await channel.assertQueue(QUEUE, {
            durable: true,
            arguments: { "x-dead-letter-exchange": "", "x-dead-letter-routing-key": RETRY_QUEUE }
        });

        await channel.assertQueue(RETRY_QUEUE, {
            durable: true,
            arguments: {
                "x-message-ttl": RETRY_TTL,
                "x-dead-letter-exchange": "",
                "x-dead-letter-routing-key": QUEUE
            }
        });

        await channel.assertQueue(DLQ, { durable: true });
        await channel.bindQueue(QUEUE, EXCHANGE, "");
        await channel.prefetch(1);

        channel.consume(QUEUE, msg => this.#handleMessage(channel, msg), { noAck: false });

        logger.info("videoService Rabbit consumer started");
    }

    async #handleMessage(channel: Channel, msg: ConsumeMessage | null): Promise<void> {
    if (!msg) return;

    const retryCount = (msg.properties.headers?.["x-retry-count"] as number) ?? 0;
    const receivedAt = new Date().toISOString();

    try {
        const data = JSON.parse(msg.content.toString());

        logger.info("video received in videoService", { 
            userId: data.id, 
            retryCount, 
            receivedAt 
        });

        console.log(`[${receivedAt}] video: `, data);

        if (!data.email) throw new Error("Missing required field: email");

        await this.videoService.createVideo(data);

        channel.ack(msg);
        logger.info("video processed in videoService", { 
            userId: data.id, 
            processedAt: new Date().toISOString() 
        });

    } catch (error) {
        logger.error("videoService processing failed", {
            error: error instanceof Error ? error.message : error,
            retryCount,
            receivedAt
        });

        if (retryCount >= RETRY_LIMIT) {
        channel.sendToQueue(DLQ, msg.content, {
            persistent: true,
            headers: { ...msg.properties.headers, "x-error": error instanceof Error ? error.message : "unknown" }
        });
        channel.ack(msg);
        return;
        }

        channel.sendToQueue(RETRY_QUEUE, msg.content, {
        persistent: true,
        headers: { ...msg.properties.headers, "x-retry-count": retryCount + 1 }
        });

        channel.ack(msg);
    }
    }

}
