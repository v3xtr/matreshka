import { SafeUserDTO } from "../user/safe.user.dto.js"

export interface RegisterRequestDTO {
  email: string
  password: string
  name: string
  phone: string
}

export interface RegisterResponseDTO {
  user: SafeUserDTO
  accessToken: string
  refreshToken: string
}
