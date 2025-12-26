import { IUserRepo } from "#internal/interfaces/user.repo.interface.js";
import { PrismaClient, User } from "src/prisma/client.js";

export class UserRepo implements IUserRepo{

    constructor(private readonly prisma: PrismaClient){}

    async findByEmail(email: string): Promise<User | null>{
        return await this.prisma.user.findUnique({
            where: { email }
        })
    }

    async create(data: User): Promise<User>{
        return this.prisma.user.create({
            data
        })
    }
}
