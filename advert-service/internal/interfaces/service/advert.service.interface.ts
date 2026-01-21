import { AdvertRequestType } from "#internal/validation/advert.validation.js";
import { Advert } from "src/prisma/client.js";

export interface IAdvertService{
    create(data: AdvertRequestType): Promise<Advert>
    getOne(id: string): Promise<Advert | null>
    getAdverts(query: any): Promise<Advert[]>
    delete(id: string): Promise<void>
}
