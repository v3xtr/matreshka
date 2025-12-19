import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().max(40, "Ваше имя привышает лимит символов"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(11, "Длина телефона не верна").max(11, "Длина телефона не верна"),
  password: z.string().min(6, "Пароль должен состоять из минимум 6 символов").max(20, "Пароль Слишком длинный"),
});

export const LoginSchema = z.object({
  login: z.string(),
  password: z.string()
})

export type RegisterSchemaRequest = z.infer<typeof RegisterSchema>
export type LoginSchemaRequest = z.infer<typeof LoginSchema>
