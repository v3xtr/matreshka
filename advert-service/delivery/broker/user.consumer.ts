// delivery/broker/user.consumer.ts
import { IBrokerUserConsumer } from "../interfaces/broker/user.broker.delivery.interface.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { UserRepo } from "#internal/repo/user.repo.js";
import { UserService } from "#internal/service/user.service.js";
import amqp, {Channel, ConsumeMessage} from "amqplib";
import { User } from "../../src/prisma/client.js";
import {createMessageHandler, QueueConfig, setupRabbitQueue} from "#delivery/broker/broker.consumer.js";
import {IUserService} from "#internal/interfaces/service/user.service.interface.js";

const USER_CONFIG: QueueConfig = {
  exchange: "user.created",
  queue: "chat.user.created",
  retryQueue: "chat.user.created.retry",
  dlq: "chat.user.created.dlq",
  retryLimit: 5,
  retryTtl: 5000,
  serviceName: "UserService"
};

export class BrokerUserConsumer implements IBrokerUserConsumer {

  private readonly userService: IUserService

  constructor() {
    this.userService = new UserService(new UserRepo(prisma));
  }

  async startConsumer(channel: Channel): Promise<void> {

    await setupRabbitQueue(channel, USER_CONFIG);

    const messageHandler = createMessageHandler(USER_CONFIG, async (data: User) => {
      if (!data.email) throw new Error("Missing required field: email");
      await this.userService.createUser(data);
    });

    await channel.consume(USER_CONFIG.queue, (msg: ConsumeMessage | null) => messageHandler(channel, msg), { noAck: false });
  }
}