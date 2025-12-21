import { LoginSchemaRequest, RegisterSchemaRequest } from "#internal/validation/auth.validation.js";
import { RegisterResponseDTO } from "#internal/dto/auth/register.auth.dto.js";
import { LoginResponseDTO } from "#internal/dto/auth/login.auth.dto.js";

export interface IAuthService{
    register(data: RegisterSchemaRequest): Promise<RegisterResponseDTO>
    login(data: LoginSchemaRequest): Promise<LoginResponseDTO>
}
