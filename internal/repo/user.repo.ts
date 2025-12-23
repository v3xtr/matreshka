import { PrismaClient, User } from "src/prisma/index.js";
import { IUserRepo } from "../interfaces/user.repo.interface.js";

export class UserRepo implements IUserRepo{
    constructor(private readonly prisma: PrismaClient){}

    async create(data: User): Promise<User>{
        return await this.prisma.user.upsert({
            where: { id: data.id },
            update: data,
            create: data
        })
    }

    }

