import { User } from "src/prisma/client.js"

export interface IUserRepo{
    findByEmail(email: string): Promise<User | null>
    create(data: User): Promise<User>
}
