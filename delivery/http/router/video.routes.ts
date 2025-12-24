import { router } from "#internal/adapter/router/router.js";
import { VideoController } from "../video.controller.js";
import { VideoService } from "#internal/services/video.service.js";
import { VideoRepo } from "#internal/repo/video.repo.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { s3 } from "#internal/adapter/bucket/bucket.js";
import { uploadVideoMiddleware } from "#internal/middlewares/upload.video.middleware.js";
import { RabbitConnection } from "#internal/adapter/rabbit/rabbit.js";
import { VideoEvents } from "#internal/services/video.events.js";


const rabbit = new RabbitConnection()
const channel = await rabbit.connect()

const videoEvents = new VideoEvents(channel)
const videoRepo = new VideoRepo(prisma)

const videoService = new VideoService(
  s3,
  videoRepo,
  videoEvents
)
const videoController = new VideoController(videoService)

router.post("/upload", uploadVideoMiddleware, videoController.uploadVideo.bind(videoController));
router.get("/user/:id", videoController.getVideos.bind(videoController))

export default router;
