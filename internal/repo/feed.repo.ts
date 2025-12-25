import { IFeedRepo } from "#internal/interfaces/feed.repo.interface.js";
import { PrismaClient } from "src/prisma/index.js";

export class FeedRepo implements IFeedRepo{
    constructor(private readonly prisma: PrismaClient){}
}
