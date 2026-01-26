import { generateTokens } from "../../pkg/jwt.js";
import { comparePasswords, hashPassword } from "../../pkg/hash.password.js";
import { generateNumericId } from '../../pkg/id.generator.js'
import { LoginSchemaRequest, RegisterSchemaRequest } from "../validation/auth.validation.js";
import { logger } from '../adapter/logger/logger.js'
import { User } from '../../src/prisma/index.js'
import { ApiError } from '../../pkg/api.error.js'
import { UserEvents } from "./user.events.js";
import { RegisterResponseDTO } from "../dto/auth/register.auth.dto.js";
import { LoginResponseDTO } from "../dto/auth/login.auth.dto.js";
import { IAuthService } from "../interfaces/auth.service.interface.js";
import { IAuthRepo } from "../interfaces/auth.repo.interface.js";
import { Channel } from "amqplib";
import { IVerificationService } from "../interfaces/notification.service.interface.js";
import { generateCode } from "../../pkg/code.generator.js";
import { IAuthCacheRepo } from "../interfaces/verification.cache.repo.js";

export class AuthService implements IAuthService{
    constructor(
        private readonly authRepo: IAuthRepo,
        private readonly authCacheRepo: IAuthCacheRepo,
        private readonly channel: Channel,
        private readonly verificationService: IVerificationService
    ){}

    async register(data: RegisterSchemaRequest): Promise<RegisterResponseDTO> {
        const userExists: User | null = await this.authRepo.getUserByLogin(data.phone);

        if (userExists) {
            logger.error("Пользователь уже существует")
            throw new ApiError('Пользователь уже существует', 400);
        }

        const userId = generateNumericId(12);
        
        const hashedPassword: string = await hashPassword(data.password)

        const user: User = await this.authRepo.createUser({
            id: userId,
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
            description: ""
        });

        const { accessToken, refreshToken } = await generateTokens(user.id);

        await new UserEvents(this.channel).sendToQueue(user)

        const { password, ...safeUser } = user
        return { user: safeUser, accessToken, refreshToken };
    }

    async login(data: LoginSchemaRequest): Promise<LoginResponseDTO> {
        const userExists: User | null = await this.authRepo.getUserByLogin(data.login);

        if (!userExists) {
            logger.error("Пользователь не существует")
            throw new ApiError("Неверные данные", 400);
        }

        const passwordMatches: boolean = await comparePasswords(
            data.password, 
            userExists.password
        );

        if (!passwordMatches) {
            logger.error("Неверный Пароль")
            throw new ApiError("Неверные данные", 400);
        }

        const { accessToken, refreshToken } = await generateTokens(userExists.id);
        const { password, ...safeUser } = userExists
        return { user: safeUser, accessToken, refreshToken };
    }

    async sendEmailCode(userId: string, email: string): Promise<number>{
        const code: string = generateCode()

        await this.verificationService.sendMail(email, code)

        return await this.authCacheRepo.storeCode(userId, code)

    }

    async sendSmsCode(userId: string, phone: string): Promise<number>{
        const code: string = generateCode()

        await this.verificationService.sendSms(phone, code)

        return await this.authCacheRepo.storeCode(userId, phone)
    }


    async checkCode(userId: string, code: string): Promise<boolean>{
        const userCode: string | null = await this.authCacheRepo.getCode(userId)

        if(!userCode) {
            throw new ApiError("Код Истек", 404)
        }

        return userCode === code;
    }
}

