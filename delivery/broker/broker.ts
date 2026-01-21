import { Channel, ConsumeMessage } from "amqplib";
import { ProfileService } from "#internal/services/profile.service.js";
import { MediaService } from "#internal/services/media.service.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { ProfileRepo } from "#internal/repo/profile.repo.js";
import { MediaRepo } from "#internal/repo/media.repo.js";
import { logger } from "#internal/adapter/logger/logger.js";
import { s3 } from "#internal/adapter/bucket/bucket.js";
import { IProfileService } from "#internal/interfaces/profile/profile.service.interface.js";
import { IMediaService } from '#internal/interfaces/media/media.service.interface.js'
import { IBrokerConsumer } from './interfaces/broker.consumer.interface.js'
import { User } from 'src/prisma/index.js'
import { Media } from 'src/prisma/index.js'

const QUEUE_CONFIG = {
  PROFILE: {
    EXCHANGE: "user.created",
    QUEUE: "user.profile",
    RETRY_QUEUE: "user.profile.retry",
    DLQ: "user.profile.dlq",
    RETRY_LIMIT: 5,
    RETRY_TTL: 5000,
    PREFETCH: 1
  },
  MEDIA: {
    EXCHANGE: "media.created",
    QUEUE: "media.processing",
    RETRY_QUEUE: "media.processing.retry",
    DLQ: "media.processing.dlq",
    RETRY_LIMIT: 3,
    RETRY_TTL: 30000,
    PREFETCH: 5
  }
} as const;

type QueueType = keyof typeof QUEUE_CONFIG;

export class BrokerConsumer implements IBrokerConsumer {
  private profileService: IProfileService;
  private mediaService: IMediaService;
  private mediaProcessors: Record<string, Function>

  constructor() {
    this.profileService = new ProfileService(new ProfileRepo(prisma), s3);
    this.mediaService = new MediaService(new MediaRepo(prisma));

    this.mediaProcessors = {
      'video': this.#processVideo.bind(this),
      'image': this.#processImage.bind(this),
    };
  }

  async startConsumer(channel: Channel): Promise<void> {
    logger.info("🔄 Starting BrokerConsumer...");

    try {
      await Promise.all([
        this.#setupQueueConsumer(channel, 'PROFILE'),
        this.#setupQueueConsumer(channel, 'MEDIA')
      ]);

      logger.info("✅ BrokerConsumer started successfully");
    } catch (error) {
      logger.error("❌ Failed to start BrokerConsumer", {
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  async #setupQueueConsumer(channel: Channel, queueType: QueueType): Promise<void> {
    const config = QUEUE_CONFIG[queueType];

    try {
      await channel.assertExchange(config.EXCHANGE, "fanout", {
        durable: true
      });

      await channel.assertQueue(config.QUEUE, {
        durable: true,
        arguments: {
          "x-dead-letter-exchange": "",
          "x-dead-letter-routing-key": config.RETRY_QUEUE
        },
      });

      await channel.assertQueue(config.RETRY_QUEUE, {
        durable: true,
        arguments: {
          "x-message-ttl": config.RETRY_TTL,
          "x-dead-letter-exchange": "",
          "x-dead-letter-routing-key": config.QUEUE,
        },
      });

      await channel.assertQueue(config.DLQ, {
        durable: true
      });

      await channel.bindQueue(config.QUEUE, config.EXCHANGE, "");

      await channel.prefetch(config.PREFETCH);

      await channel.consume(
          config.QUEUE,
          (msg) => this.#handleQueueMessage(channel, msg, queueType),
          { noAck: false }
      );

      logger.info(`✅ ${queueType} queue consumer started`, {
        queue: config.QUEUE,
        exchange: config.EXCHANGE,
        prefetch: config.PREFETCH
      });

    } catch (error) {
      logger.error(`❌ Failed to setup ${queueType} queue`, {
        queue: config.QUEUE,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  async #handleQueueMessage(channel: Channel, msg: ConsumeMessage | null, queueType: QueueType): Promise<void> {
    if (!msg) return;

    const config = QUEUE_CONFIG[queueType];
    const retryCount = (msg.properties.headers?.["x-retry-count"] as number) ?? 0;
    const messageId = msg.properties.messageId || `msg-${Date.now()}`;

    logger.debug(`📨 Processing ${queueType} message`, {
      messageId,
      queue: config.QUEUE,
      retryCount
    });

    try {
      const data = JSON.parse(msg.content.toString());

      switch (queueType) {
        case 'PROFILE':
          await this.#processProfileMessage(data);
          break;

        case 'MEDIA':
          await this.#processMediaMessage(data);
          break;

        default:
          throw new Error(`Unknown queue type: ${queueType}`);
      }

      channel.ack(msg);

      logger.info(`✅ ${queueType} message processed successfully`, {
        messageId,
        retryCount,
        dataId: data.id || data.mediaId
      });

    } catch (error) {
      await this.#handleProcessingError(
          channel,
          msg,
          error,
          queueType,
          retryCount,
          messageId
      );
    }
  }

  async #processProfileMessage(data: User): Promise<void> {
    logger.info("Processing user profile", {
      userId: data.id
    });

    await this.profileService.createUser(data);

    logger.info("User profile created", {
      userId: data.id
    });
  }

  async #processMediaMessage(data: any): Promise<void> {
    if (!data || typeof data !== 'object' || !data.id || !data.mimeType) {
      throw new Error(`Invalid media data format: ${JSON.stringify(data)}`);
    }

    logger.info("🎬 Processing media", {
      mediaId: data.id,
      type: data.mimeType,
      cdnUrl: data.cdnUrl
    });

    const processor = this.mediaProcessors[data.mimeType];

    if (processor) {
      await processor(data);
    } else {
      await this.mediaService.processMedia(data);
    }

    logger.info("✅ Media processed", { mediaId: data.id });
  }

  async #processVideo(data: Media): Promise<void> {
    logger.debug("🎥 Processing video", {
      mediaId: data.id,
      cdnUrl: data.cdnUrl
    });

    await this.mediaService.processMedia(data)

    logger.info("🎥 Video processing simulated", {
      mediaId: data.id
    });
  }

  async #processImage(data: any): Promise<void> {
    logger.debug("🖼️ Processing image", {
      mediaId: data.mediaId,
      cdnUrl: data.cdnUrl
    });

    logger.info("🖼️ Image processing simulated", {
      mediaId: data.mediaId
    });
  }

  async #handleProcessingError(channel: Channel, msg: ConsumeMessage, error: any, queueType: QueueType, retryCount: number, messageId: string): Promise<void> {
    const config = QUEUE_CONFIG[queueType];
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error(`❌ ${queueType} processing failed`, {
      messageId,
      error: errorMessage,
      retryCount,
      queue: config.QUEUE
    });

    if (retryCount >= config.RETRY_LIMIT) {
      logger.warn(`📭 Moving message to DLQ (retry limit exceeded)`, {
        messageId,
        retryCount,
        dlq: config.DLQ
      });

      channel.sendToQueue(config.DLQ, msg.content, {
        persistent: true,
        headers: {
          ...msg.properties.headers,
          "x-error": errorMessage,
          "x-queue-type": queueType,
          "x-failed-at": new Date().toISOString(),
          "x-final-retry-count": retryCount
        },
      });

      channel.ack(msg);
      return;
    }

    const newRetryCount = retryCount + 1;
    logger.info(`🔄 Sending message to retry queue`, {
      messageId,
      currentRetry: retryCount,
      newRetryCount,
      retryQueue: config.RETRY_QUEUE
    });

    channel.sendToQueue(config.RETRY_QUEUE, msg.content, {
      persistent: true,
      headers: {
        ...msg.properties.headers,
        "x-retry-count": newRetryCount,
        "x-queue-type": queueType,
        "x-last-error": errorMessage
      },
    });

    channel.ack(msg);
  }
}