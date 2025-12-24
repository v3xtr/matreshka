import { prisma } from "#internal/adapter/prisma/prisma.js";
import { router } from "#internal/adapter/router/router.js";
import { CommentRepo } from "#internal/repo/comment.repo.js";
import { CommentService } from "#internal/services/comment.service.js";
import { CommentController } from "../comment.controller.js";

const commentRepo = new CommentRepo(prisma)
const commentService = new CommentService(commentRepo)
const commentController = new CommentController(commentService)

router.post("/", commentController.create.bind(commentController))
router.get("/:videoId", commentController.getByVideo.bind(commentController))

export default router
