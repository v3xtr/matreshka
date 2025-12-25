import { Router } from "express";
import { VideoService } from "#internal/services/video.service.js";
import { VideoRepo } from "#internal/repo/video.repo.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { VideoController } from "#delivery/http/video.controller.js";

const router = Router();

const videoRepo = new VideoRepo(prisma);
const videoService = new VideoService(videoRepo);
const videoController = new VideoController(videoService);

router.post("/views", videoController.addView.bind(videoController));

export default router;
