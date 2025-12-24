import { prisma } from '#internal/adapter/prisma/prisma.js'
import { router } from '#internal/adapter/router/router.js'
import { LikeRepo } from '#internal/repo/like.repo.js'
import { LikeService } from '#internal/services/like.service.js'
import { LikeController } from '../like.controller.js'

const likeRepo = new LikeRepo(prisma)
const likeService = new LikeService(likeRepo)
const likeController = new LikeController(likeService)

router.post("/like", likeController.like.bind(likeController))
router.post("/unlike", likeController.unlike.bind(likeController))
router.get("/:videoId/likes-count", likeController.getLikesCount.bind(likeController))

export default router
