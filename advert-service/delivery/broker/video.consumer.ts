import { IBrokerVideoConsumer } from "../interfaces/broker/video.broker.delivery.interface.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { VideoRepo } from "#internal/repo/video.repo.js";
import { VideoService } from "#internal/service/video.service.js";
import { Channel, ConsumeMessage } from "amqplib";
import { Video } from 'src/prisma/client.js'
import { createMessageHandler, QueueConfig, setupRabbitQueue } from "#delivery/broker/broker.consumer.js";

const VIDEO_CONFIG: QueueConfig = {
    exchange: "video.created",
    queue: "video",
    retryQueue: "video.retry",
    dlq: "video.dlq",
    retryLimit: 5,
    retryTtl: 5000,
    serviceName: "VideoService"
};

export class BrokerVideoConsumer implements IBrokerVideoConsumer {

    private readonly videoService: VideoService;

    constructor() {
        this.videoService =  new VideoService(new VideoRepo(prisma));
    }

    async startConsumer(channel: Channel): Promise<void> {

        await setupRabbitQueue(channel, VIDEO_CONFIG);

        const messageHandler = createMessageHandler(VIDEO_CONFIG, async (data: Video) => {
            if (!data.id) throw new Error("Missing required field: id");
            await this.videoService.createVideo(data);
        });

        await channel.consume(VIDEO_CONFIG.queue, (msg: ConsumeMessage | null) => messageHandler(channel, msg), { noAck: false });
    }
}