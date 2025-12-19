import { generateTokens } from "../../pkg/jwt.js";
import { comparePasswords, hashPassword } from "../../pkg/hash.password.js";
import { generateNumericId } from '../../pkg/id_generator.js'
import { LoginSchemaRequest, RegisterSchemaRequest } from "internal/validation/auth.validation.js";
import { logger } from '../adapter/logger/logger.js'
import { User } from '../../src/prisma/index.js'
import { ApiError } from '../../pkg/api.error.js'
import { UserEvents } from "./user.events.js";
import { channel } from "#internal/adapter/rabbit/rabbit.js";
import { RegisterResponseDTO } from "#internal/dto/auth/register.auth.dto.js";
import { LoginResponseDTO } from "#internal/dto/auth/login.auth.dto.js";
import { IAuthService } from "#internal/interfaces/auth.service.interface.js";
import { IAuthRepo } from "#internal/interfaces/auth.repo.interface.js";

export class AuthService implements IAuthService{
    constructor(
        private readonly authRepo: IAuthRepo){}

    async register(data: RegisterSchemaRequest): Promise<RegisterResponseDTO> {
        const userExists: User | null = await this.authRepo.getUserByLogin(data.email);

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

        await new UserEvents(channel).sendToQueue(user)
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


}

