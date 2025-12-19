import { logger } from "#internal/adapter/logger/logger.js";
import { IUserEvenets } from "#internal/interfaces/user.evenets.interface.js";
import { Channel } from "amqplib";
import { User } from "src/prisma/index.js";

export class UserEvents implements IUserEvenets{
    constructor(
        private readonly channel: Channel
    ){}

    async sendToQueue(user: User): Promise<void>{
        await this.channel.assertQueue("user", {
            durable: true
        })
        
        this.channel.sendToQueue("user", Buffer.from(JSON.stringify(user)))
        logger.info({user: JSON.stringify(user)})
        logger.info(JSON.stringify(user))
    }
}
