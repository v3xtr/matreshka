import { IRabbitConsumer } from "#delivery/interfaces/broker/feed.broker.delivery.interface.js";
import { logger } from "#internal/adapter/logger/logger.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { IVideoService } from "#internal/interfaces/video.interface.service.js";
import { VideoRepo } from "#internal/repo/video.repo.js";
import { VideoService } from "#internal/services/video.service.js";
import { Channel, ConsumeMessage } from "amqplib";

const EXCHANGE = "video.created";
const QUEUE = "feed.video.created";
const RETRY_QUEUE = "feed.video.created.retry";
const DLQ = "feed.video.created.dlq";
const RETRY_LIMIT = 5;
const RETRY_TTL = 5000;

export class RabbitVideoConsumer implements IRabbitConsumer {
  private videoService: IVideoService;

  constructor() {
    this.videoService = new VideoService(new VideoRepo(prisma));
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

    logger.info("VideoService Rabbit consumer started");
  }

  async #handleMessage(channel: Channel, msg: ConsumeMessage | null): Promise<void> {
    if (!msg) return;

    const retryCount = (msg.properties.headers?.["x-retry-count"] as number) ?? 0;
    const receivedAt = new Date().toISOString();

    try {
        const data = JSON.parse(msg.content.toString());

        logger.info("Video received in feedService", { 
            videoId: data.id, 
            userId: data.userId, 
            retryCount, 
            receivedAt 
        });

        console.log(`[${receivedAt}] Video: `, data);

        await this.videoService.create({
            id: data.id,
            userId: data.userId,
            description: data.description || "",
            likesCount: 0,
            commentsCount: 0,
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date()
        });

        channel.ack(msg);

        logger.info("Video processed in VideoService", { 
            videoId: data.id, 
            userId: data.userId, 
            processedAt: new Date().toISOString() 
        });

    } catch (error) {
        logger.error("VideoService processing failed", {
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
