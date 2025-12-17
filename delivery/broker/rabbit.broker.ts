import { Channel } from "amqplib";
import { ProfileService } from "#internal/services/profile.service.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { ProfileRepo } from "#internal/repo/repo.js";
import { logger } from "#internal/adapter/logger/logger.js";

export class RabbitConsumer {
  private profileService = new ProfileService(new ProfileRepo(prisma));

  async startConsumer(channel: Channel): Promise<void> {
    await channel.assertQueue("user", {
        durable: true
    });

    channel.consume("user", async (msg) => {
      if (!msg) return;

      const data = JSON.parse(msg.content.toString());

      logger.info("Сообщение от брокера", { msg: data });

      await this.profileService.createUser(data);
      channel.ack(msg);
    });


    logger.info("Слушатель брокера запущен");
  }
}
