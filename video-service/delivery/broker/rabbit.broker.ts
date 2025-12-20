import { Channel } from "amqplib";
import { IRabbitConsumer } from "./interfaces/rabbit.interface";
import { VideoRepo } from "#internal/repo/video.repo";
import { prisma } from "#internal/adapter/prisma/prisma";
import { logger } from "#internal/adapter/logger/logger";
import { VideoService } from "#internal/services/video.service";

export class RabbitConsumer implements IRabbitConsumer{
  private videoService = new VideoService(new VideoRepo(prisma));

  async startConsumer(channel: Channel): Promise<void> {
    await channel.assertQueue("user", {
        durable: true
    });

    channel.consume("user", async (msg) => {
      if (!msg) return;

      const data = JSON.parse(msg.content.toString());

      logger.info("Сообщение от брокера", { msg: data });

      await this.videoService.createUser(data);
      channel.ack(msg);
    });


    logger.info("Слушатель брокера запущен");
  }
}
