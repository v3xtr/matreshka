import { IVideoRepo } from "#internal/interfaces/video.repo.interface";
import { User } from "src/prisma";
import { IVideoService } from "../interfaces/video.service.interface";

export class VideoService implements IVideoService{
    constructor (private readonly repo: IVideoRepo){}

    async createUser(data: User): Promise<User>{
        return this.repo.createUser(data)
    }

}
