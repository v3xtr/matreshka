import { IAuthRepo } from "#internal/interfaces/auth.repo.interface.js";
import { PrismaClient, User } from "src/prisma/index.js";

export class AuthRepo implements IAuthRepo{
    constructor (private readonly prisma: PrismaClient){}

    async createUser(data: User): Promise<User>{
        return await this.prisma.user.create({
            data
        })
    }

    async getUserByLogin(login: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: login },
                    { phone: login }
                ]
            }
        });
    }

}
