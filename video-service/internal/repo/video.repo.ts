import { PrismaClient, User } from "src/prisma";
import { IVideoRepo } from "../interfaces/video.repo.interface";

export class VideoRepo implements IVideoRepo{
    constructor(private readonly prisma: PrismaClient){}

    async createUser(data: User): Promise<User>{
        return this.prisma.user.create({ 
            data
         })
    }
}
