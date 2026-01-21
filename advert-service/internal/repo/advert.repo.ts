import { IAdvertRepo } from "#internal/interfaces/repo/advert.repo.interface.js";
import { AdvertCreateSchemaType } from "#internal/validation/advert.validation.js";
import { Advert, PrismaClient } from "src/prisma/client.js";

export class AdvertRepo implements IAdvertRepo {
    constructor(private readonly prisma: PrismaClient) {}

    async create(id: string, data: AdvertCreateSchemaType): Promise<Advert> {
        const { pictures, services, workSchedule, videoId, ...advertData } = data;

        return this.prisma.advert.create({
            data: {
                ...advertData,
                id,
                pictures: {
                    create: pictures.map(pic => ({
                        pictureUrl: pic.pictureUrl
                    }))
                },
                services: {
                    create: services.map(service => ({
                        text: service.text
                    }))
                },
                workSchedule: {
                    create: workSchedule.map(schedule => ({
                        fromDay: schedule.fromDay,
                        toDay: schedule.toDay,
                        fromTime: schedule.fromTime,
                        toTime: schedule.toTime,
                        is24h: schedule.is24h
                    }))
                },
                ...(videoId && {
                    video: {
                        create: {
                            videoUrl: videoId
                        }
                    }
                })
            },
            include: {
                pictures: true,
                services: true,
                workSchedule: true,
                video: true
            }
        });
    }

    async getOne(id: string): Promise<Advert | null> {
        return this.prisma.advert.findUnique({
            where: { id },
            include: {
                pictures: true,
                services: true,
                workSchedule: true,
                video: true
            }
        });
    }

    async getAdverts(query: any): Promise<Advert[]> {
        const take = query.take ? Number(query.take) : 10;
        const cursor = query.cursor;

        return this.prisma.advert.findMany({
            take,
            ...(cursor && {
                cursor: { id: cursor },
                skip: 1
            }),
            orderBy: {
                id: "desc"
            },
            where: {
                ...(query.category && {
                    category: query.category
                }),
                ...(query.subcategory && {
                    subCategory: query.subcategory
                }),
                ...(query.profession && {
                    profession: query.profession
                }),
                ...(query.sphere && {
                    sphere: query.sphere
                }),
                ...(query.employment && {
                    employment: query.employment
                }),
                ...(query.userId && {
                    userId: query.userId
                }),
                ...(query.priceFrom || query.priceTo ? {
                    price: {
                        ...(query.priceFrom && {
                            gte: query.priceFrom
                        }),
                        ...(query.priceTo && {
                            lte: query.priceTo
                        })
                    }
                } : {})
            },
            include: {
                pictures: true
            }
        });
    }

    async delete(id: string): Promise<Advert> {
        return this.prisma.advert.delete({
            where: { id }
        });
    }
}