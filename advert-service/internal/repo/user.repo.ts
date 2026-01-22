import { IUserRepo } from "#internal/interfaces/repo/user.repo.interface.js";
import { PrismaClient, User } from "src/prisma/client.js";

export class UserRepo implements IUserRepo{
    constructor(private readonly prisma: PrismaClient) {}

    async create(data: User): Promise<User> {
        return this.prisma.user.create({ data })
    }
}
