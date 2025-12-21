import { IProfileRepo } from "#internal/interfaces/profile.repo.interface.js";
import { UpdateProfileRequest } from "#internal/validation/profile.validation.js";
import { PrismaClient, User } from "src/prisma/index.js";

export class ProfileRepo implements IProfileRepo{
    constructor(private readonly prisma: PrismaClient){}

    async get(id: string): Promise<User | null>{
        return this.prisma.user.findFirst({
            where: { id }
        })
    }

    async create(data: User): Promise<User>{
        return this.prisma.user.upsert({
            where: { id: data.id },
            update: data,
            create: data
        })
    }

    async update(data: UpdateProfileRequest): Promise<User> {
       const where = data.id
        ? { id: data.id }
        : { email: data.email };

        const user = await this.prisma.user.update({
            where,
            data: {
                name: data.name,
                phone: data.phone,
                city: data.city ?? "",
                description: data.description ?? ""
            }
         });

         return user;
    }

    async updateAvatar(id: string, avatarUrl: string): Promise<User>{
        return this.prisma.user.update({
            where: { id },
            data: { avatarUrl }
        })
    }
}
