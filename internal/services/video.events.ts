import { logger } from "#internal/adapter/logger/logger.js";
import { IVideoEvenets } from "#internal/interfaces/video.events.interface.js";
import { Channel } from "amqplib";
import { Video } from "src/prisma/index.js";

const EXHANGE = "video.created";

export class VideoEvents implements IVideoEvenets{
    constructor(private readonly channel: Channel){}

    async sendToQueue(video: Video): Promise<void>{
        await this.channel.assertExchange(EXHANGE, "fanout", { durable: true })

        this.channel.publish(EXHANGE, "", Buffer.from(JSON.stringify(video)), {
            persistent: true,
            contentType: "application/json"
        })

        logger.info("Video event send", { videoId: video.id })
    }
}
