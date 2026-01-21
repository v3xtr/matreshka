import { IRabbitUserConsumer } from "#delivery/interfaces/broker/user.broker.delivery.interface.js";
import { logger } from "#internal/adapter/logger/logger.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { IUserService } from "#internal/interfaces/service/user.service.interface.js";
import { UserRepo } from "#internal/repo/user.repo.js";
import { UserService } from "#internal/service/user.service.js";
import { Channel, ConsumeMessage } from "amqplib";

const EXCHANGE = "user.created";
const QUEUE = "chat.user.created";
const RETRY_QUEUE = "chat.user.created.retry";
const DLQ = "chat.user.created.dlq";
const RETRY_LIMIT = 5;
const RETRY_TTL = 5000;

export class RabbitUserConsumer implements IRabbitUserConsumer {
  private userService: IUserService;

  constructor() {
    this.userService = new UserService(new UserRepo(prisma));
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

    logger.info("UserService Rabbit consumer started");
  }

 async #handleMessage(channel: Channel, msg: ConsumeMessage | null): Promise<void> {
  if (!msg) return;

  const retryCount = (msg.properties.headers?.["x-retry-count"] as number) ?? 0;
  const receivedAt = new Date().toISOString();

  try {
    const data = JSON.parse(msg.content.toString());

    logger.info("User received in UserService", { 
      userId: data.id, 
      retryCount, 
      receivedAt 
    });

    console.log(`[${receivedAt}] User: `, data);

    if (!data.email) throw new Error("Missing required field: email");

    await this.userService.createUser(data);

    channel.ack(msg);
    logger.info("User processed in UserService", { 
      userId: data.id, 
      processedAt: new Date().toISOString() 
    });

  } catch (error) {
    logger.error("UserService processing failed", {
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
