import { prisma } from "#internal/adapter/prisma/prisma.js";
import { router } from "#internal/adapter/router/router.js";
import { AuthRepo } from "#internal/repo/auth.repo.js";
import { AuthService } from "#internal/service/auth.service.js";
import { AuthController } from "#delivery/http/auth.controller.js";
import { channel } from "#internal/adapter/rabbit/rabbit.js";
import {VerificationService} from "#internal/service/verification.service.js";
import { transporter } from "#internal/adapter/nodemailer/nodemailer.js";

const authRepo = new AuthRepo(prisma)
const verficationService = new VerificationService(transporter)
const authService = new AuthService(authRepo, channel, verficationService)
const authController = new AuthController(authService)

router.post("/register", authController.register.bind(authController))
router.post("/login", authController.login.bind(authController))

export default router
