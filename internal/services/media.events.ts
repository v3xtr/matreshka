import { logger } from "#internal/adapter/logger/logger.js";
import { IMediaEvents } from "#internal/interfaces/media.events.interface.js";
import { Channel } from "amqplib";
import { Media } from 'src/prisma/index.js'

export class MediaEvents implements IMediaEvents {
    constructor(private readonly channel: Channel){}

    async sendToQueue(mediaData: Media): Promise<void> {
        await this.channel.assertExchange("media.created", "fanout", {
            durable: true
        });

        this.channel.publish(
            "media.created",
            "",
            Buffer.from(JSON.stringify(mediaData)),  // ← полный объект
            {
                persistent: true,
                contentType: "application/json",
                headers: {
                    "x-media-type": mediaData.mimeType,
                    "x-timestamp": new Date().toISOString()
                }
            }
        );

        logger.info("📤 Media event sent to queue", {
            type: mediaData.mimeType,
            mediaId: mediaData.id
        });
    }
}