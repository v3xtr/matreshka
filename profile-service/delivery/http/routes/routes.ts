import { router } from '../../../internal/adapter/router/router.js'
import { IProfileService } from '../../../internal/interfaces/profile.service.interface.js'
import { IProfileController } from '../interfaces/profile.interface.service.js'
import { IProfileRepo } from '../../../internal/interfaces/profile.repo.interface.js'
import { ProfileController } from '../profile.controller.js'
import { ProfileService } from '../../../internal/services/profile.service.js'
import { ProfileRepo } from '../../../internal/repo/repo.js'
import { prisma } from '../../../internal/adapter/prisma/prisma.js'

const profileRepo: IProfileRepo = new ProfileRepo(prisma)
const profileService: IProfileService = new ProfileService(profileRepo)
const profileController: IProfileController = new ProfileController(profileService)

router.get("/profile/:id", profileController.getUser.bind(profileController))
router.put("/profile/update", profileController.updateProfile.bind(profileController))

export default router
