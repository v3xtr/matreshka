import {Video} from "../../../src/prisma/client.js";

export interface IVideoRepo{
    create(data: Video): Promise<Video>
}
