import { prisma } from "../../../internal/adapter/prisma/prisma.js";
import { router } from "../../../internal/adapter/router/router.js";
import { AuthRepo } from "../../../internal/repo/auth.repo.js";
import { AuthService } from "../../../internal/service/auth.service.js";
import { AuthController } from "../auth.controller.js";

const authRepo = new AuthRepo(prisma)
const authService = new AuthService(authRepo)
const authController = new AuthController(authService)

router.post("/register", authController.register.bind(authController))
router.post("/login", authController.login.bind(authController))

export default router
