import { SafeUserDTO } from "../user/safe.user.dto.js"

export interface LoginRequestDTO {
  login: string
  password: string
}

export interface LoginResponseDTO {
  user: SafeUserDTO
  accessToken: string
  refreshToken: string
}
