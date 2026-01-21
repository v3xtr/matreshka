import { router } from '../../../internal/adapter/router/router.js'
import { IProfileService } from '#internal/interfaces/profile/profile.service.interface.js'
import { IProfileRepo } from '#internal/interfaces/profile/profile.repo.interface.js'
import { ProfileController } from '../profile.controller.js'
import { ProfileService } from '../../../internal/services/profile.service.js'
import { ProfileRepo } from '#internal/repo/profile.repo.js'
import { prisma } from '../../../internal/adapter/prisma/prisma.js'
import { s3 } from '#internal/adapter/bucket/bucket.js'
import { IProfileController } from '../interfaces/profile.controller.interface.js'

const profileRepo: IProfileRepo = new ProfileRepo(prisma)
const profileService: IProfileService = new ProfileService(profileRepo, s3)
const profileController: IProfileController = new ProfileController(profileService)

router.get("/profile/:id", profileController.getUser.bind(profileController))
router.put("/profile/update", profileController.updateProfile.bind(profileController))
router.post("/profile/upload-avatar", profileController.updateAvatar.bind(profileController))

export default router
