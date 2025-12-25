import { prisma } from '#internal/adapter/prisma/prisma.js'
import { router } from '#internal/adapter/router/router.js'
import { PersonalFeedRepo } from '#internal/repo/personolized.feed.repo.js'
import { PopularFeedRepo } from '#internal/repo/popular.feed.repo.js'
import { VideoViewRepo } from '#internal/repo/video.view.repo.js'
import { FeedService } from '#internal/services/feed.service.js'
import { FeedController } from '../feed.controller.js'

const videoViewRepo = new VideoViewRepo(prisma)
const popularFeedRepo = new PopularFeedRepo(prisma)
const personalFeedRepo = new PersonalFeedRepo(prisma, videoViewRepo)
const feedService = new FeedService(videoViewRepo, popularFeedRepo, personalFeedRepo)
const feedController= new FeedController(feedService)

router.get("/:userId", feedController.getFeed.bind(feedController))

export default router
