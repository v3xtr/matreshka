import { LoginSchemaRequest, RegisterSchemaRequest } from "../validation/auth.validation.js";
import { RegisterResponseDTO } from "../dto/auth/register.auth.dto.js";
import { LoginResponseDTO } from "../dto/auth/login.auth.dto.js";

export interface IAuthService{
    register(data: RegisterSchemaRequest): Promise<RegisterResponseDTO>
    login(data: LoginSchemaRequest): Promise<LoginResponseDTO>
    checkCode(userId: string, code: string): Promise<boolean>
    sendEmailCode(userId: string, email: string): Promise<number>
    sendSmsCode(userId: string, phone: string): Promise<number>
}
