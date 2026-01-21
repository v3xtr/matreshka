import { router } from "#internal/adapter/router/router.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { s3 } from "#internal/adapter/bucket/bucket.js";
import { MediaRepo } from "#internal/repo/media.repo.js";
import { MediaEvents } from "#internal/services/media.events.js";
import { BrokerConnection } from "#internal/adapter/broker/broker.js";
import MediaService from "#internal/services/media.service.js";
import { MediaController } from "#delivery/http/media.controller.js";
import { Channel } from "amqplib";

const rabbit = new BrokerConnection()
const channel: Channel = await rabbit.connect()

const videoEvents = new MediaEvents(channel)
const videoRepo = new MediaRepo(prisma)

const videoService = new MediaService(
  s3,
  videoRepo,
  videoEvents
)
const mediaController = new MediaController(videoService)

router.post("/upload", mediaController.storeMediaData.bind(mediaController));
router.get("/user/:id", mediaController.getVideos.bind(mediaController))
router.delete("/user/:id", mediaController.deleteMedia.bind(mediaController))

export default router;
