import { Channel, ConsumeMessage } from "amqplib";
import { ProfileService } from "#internal/services/profile.service.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { ProfileRepo } from "#internal/repo/repo.js";
import { logger } from "#internal/adapter/logger/logger.js";
import { IRabbitConsumer } from "#internal/interfaces/rabbit.consumer.interface.js";
import { s3 } from "#internal/adapter/bucket/bucket.js";
import { IProfileService } from "#internal/interfaces/profile.service.interface.js";

const EXCHANGE = "user.created";
const QUEUE = "user.profile";
const RETRY_QUEUE = "user.profile.retry";
const DLQ = "user.profile.dlq";
const RETRY_LIMIT = 5;
const RETRY_TTL = 5000;

export class RabbitConsumer implements IRabbitConsumer {
  private profileService: IProfileService;

  constructor() {
    this.profileService = new ProfileService(new ProfileRepo(prisma), s3);
  }

  async startConsumer(channel: Channel): Promise<void> {
    await channel.assertExchange(EXCHANGE, "fanout", { durable: true });

    await channel.assertQueue(QUEUE, {
      durable: true,
      arguments: { "x-dead-letter-exchange": "", "x-dead-letter-routing-key": RETRY_QUEUE },
    });

    await channel.assertQueue(RETRY_QUEUE, {
      durable: true,
      arguments: {
        "x-message-ttl": RETRY_TTL,
        "x-dead-letter-exchange": "",
        "x-dead-letter-routing-key": QUEUE,
      },
    });

    await channel.assertQueue(DLQ, { durable: true });

    await channel.bindQueue(QUEUE, EXCHANGE, "");

    await channel.prefetch(1);

    channel.consume(QUEUE, (msg) => this.#handleMessage(channel, msg), { noAck: false });

    logger.info("ProfileService Rabbit consumer started");
  }

  async #handleMessage(channel: Channel, msg: ConsumeMessage | null): Promise<void> {
    if (!msg) return;

    const retryCount = (msg.properties.headers?.["x-retry-count"] as number) ?? 0;

    try {
      const data = JSON.parse(msg.content.toString());
      logger.info("User received in ProfileService", { userId: data.id, retryCount });

      await this.profileService.createUser(data);

      channel.ack(msg);
      logger.info("User processed in ProfileService", { userId: data.id });
    } catch (error) {
      logger.error("ProfileService processing failed", {
        error: error instanceof Error ? error.message : error,
        retryCount,
      });

      if (retryCount >= RETRY_LIMIT) {
        channel.sendToQueue(DLQ, msg.content, {
          persistent: true,
          headers: { ...msg.properties.headers, "x-error": error instanceof Error ? error.message : "unknown" },
        });
        channel.ack(msg);
        return;
      }

      channel.sendToQueue(RETRY_QUEUE, msg.content, {
        persistent: true,
        headers: { ...msg.properties.headers, "x-retry-count": retryCount + 1 },
      });

      channel.ack(msg);
    }
  }
}
