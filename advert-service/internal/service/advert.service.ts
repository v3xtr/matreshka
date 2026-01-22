import { IAdvertRepo } from "#internal/interfaces/repo/advert.repo.interface.js";
import { IAdvertService } from "#internal/interfaces/service/advert.service.interface.js";
import {
    AdvertCreateSchemaType,
    UpdateAdvertSchemaType
} from "#internal/validation/advert.validation.js";
import { generateId } from "#pkg/generate.id.js";
import { Advert } from "src/prisma/client.js";

export class AdvertService implements IAdvertService {
    constructor(private readonly advertRepo: IAdvertRepo) { }

    async create(data: AdvertCreateSchemaType): Promise<Advert> {
        const id: string = generateId();
        return this.advertRepo.create(id, data);
    }

    async getOne(id: string): Promise<Advert | null> {
        return this.advertRepo.getOne(id);
    }

    async update(data: UpdateAdvertSchemaType): Promise<Advert>{
        return await this.advertRepo.update(data)
    }

    async getAdverts(query: any): Promise<Advert[]> {
        return this.advertRepo.getAdverts(query);
    }

    async delete(id: string): Promise<void> {
        await this.advertRepo.delete(id);
    }
}