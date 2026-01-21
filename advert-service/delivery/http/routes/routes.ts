import { prisma } from "#internal/adapter/prisma/prisma.js";
import { router } from "#internal/adapter/router/router.js";
import { AdvertRepo } from "#internal/repo/advert.repo.js";
import { AdvertService } from "#internal/service/advert.service.js";
import { AdvertController } from "../advert.controller.js";

const advertRepo = new AdvertRepo(prisma)
const advertService = new AdvertService(advertRepo)
const advertController = new AdvertController(advertService)

router.post("/", advertController.create.bind(advertController))
router.get("/", advertController.getAdvert.bind(advertController))
router.get("/adverts", advertController.getAdverts.bind(advertController))
router.delete("/", advertController.delete.bind(advertController))

export default router
