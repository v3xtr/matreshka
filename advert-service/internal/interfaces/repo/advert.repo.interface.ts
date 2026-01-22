import { AdvertCreateSchemaType, UpdateAdvertSchemaType} from "#internal/validation/advert.validation.js";
import { Advert } from "src/prisma/client.js";

export interface IAdvertRepo{
    create(id: string, data: AdvertCreateSchemaType): Promise<Advert>
    getOne(id: string): Promise<Advert | null>
    getAdverts(query: any): Promise<Advert[]>
    update(data: UpdateAdvertSchemaType): Promise<Advert>
    delete(id: string): Promise<Advert>
}
