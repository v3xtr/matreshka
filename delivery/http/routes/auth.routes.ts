import { prisma } from "../../../internal/adapter/prisma/prisma.js";
import { router } from "../../../internal/adapter/router/router.js";
import { AuthRepo } from "../../../internal/repo/auth.repo.js";
import { AuthService } from "../../../internal/service/auth.service.js";
import { AuthController } from "../../../delivery/http/auth.controller.js";
import { channel } from "../../../internal/adapter/rabbit/rabbit.js";
import { VerificationService } from "../../../internal/service/verification.service.js";
import { transporter } from "../../../internal/adapter/nodemailer/nodemailer.js";
import { AuthCacheRepo } from "../../../internal/repo/auth.cache.repo.js";
import { redisClient } from '../../../internal/adapter/redis/redis.js'

const authRepo = new AuthRepo(prisma)
const authCacheRepo = new AuthCacheRepo(redisClient)
const verificationService = new VerificationService(transporter)
const authService = new AuthService(authRepo, authCacheRepo, channel, verificationService)
const authController = new AuthController(authService)

router.post("/register", authController.register.bind(authController))
router.post("/login", authController.login.bind(authController))
router.post("/checkCode", authController.checkCode.bind(authController))
router.post("/sendmail", authController.sendEmail.bind(authController))
router.post("/sendsms", authController.sendSms.bind(authController))

export default router
