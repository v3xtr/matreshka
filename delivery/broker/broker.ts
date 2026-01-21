import { Channel, ConsumeMessage } from "amqplib";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { logger } from "#internal/adapter/logger/logger.js";
import { UserService } from "#internal/services/user.service.js";
import { IUserService } from "#internal/interfaces/user.service.interface.js";
import { UserRepo } from "#internal/repo/user.repo.js";
import {IBrokerConsumer} from "#delivery/broker/interfaces/delivery.broker.interface.js";

const EXCHANGE = "user.created";
const QUEUE = "user.video";
const RETRY_QUEUE = "user.video.retry";
const DLQ = "user.video.dlq";
const RETRY_LIMIT = 5;
const RETRY_TTL = 5000;

export class BrokerConsumer implements IBrokerConsumer {
  private userService: IUserService;

  constructor() {
    this.userService = new UserService(new UserRepo(prisma));
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
        "x-dead-letter-routing-key": QUEUE
      },
    });

    await channel.assertQueue(DLQ, { durable: true });

    await channel.bindQueue(QUEUE, EXCHANGE, "");

    await channel.prefetch(1);

    channel.consume(QUEUE, msg => this.#handleMessage(channel, msg), { noAck: false });

    logger.info("userService Rabbit consumer started");
  }

  async #handleMessage(channel: Channel, msg: ConsumeMessage | null): Promise<void> {
    if (!msg) return;

    const retryCount = (msg.properties.headers?.["x-retry-count"] as number) ?? 0;

    try {
      const data = JSON.parse(msg.content.toString());
      logger.info("User received in userService", { userId: data.id, retryCount });

      await this.userService.createUser(data);

      channel.ack(msg);
      logger.info("User processed in userService", { userId: data.id });
    } catch (error) {
      logger.error("userService processing failed", {
        error: error instanceof Error ? error.message : error,
        retryCount,
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
        headers: { ...msg.properties.headers, "x-retry-count": retryCount + 1 },
      });

      channel.ack(msg);
    }
  }
}
