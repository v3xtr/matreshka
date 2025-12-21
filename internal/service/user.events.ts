import { logger } from "#internal/adapter/logger/logger.js";
import { IUserEvenets } from "#internal/interfaces/user.evenets.interface.js";
import { Channel } from "amqplib";
import { User } from "src/prisma/index.js";

const EXCHANGE = "user.created";

export class UserEvents implements IUserEvenets {
  constructor(private readonly channel: Channel) {}

  async sendToQueue(user: User): Promise<void> {
    await this.channel.assertExchange(EXCHANGE, "fanout", { durable: true });

    this.channel.publish(
      EXCHANGE,
      "",
      Buffer.from(JSON.stringify(user)),
      {
        persistent: true,
        contentType: "application/json",
      }
    );

    logger.info("User event sent", { userId: user.id });
  }
}
