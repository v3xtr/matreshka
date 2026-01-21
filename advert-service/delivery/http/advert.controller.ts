import { IAdvertController } from "#delivery/interfaces/http/advert.controller.interface.js"
import { logger } from "#internal/adapter/logger/logger.js"
import { IAdvertService } from "#internal/interfaces/service/advert.service.interface.js"
import { advertRequestSchema } from "#internal/validation/advert.validation.js"
import { Request, Response } from "express"

export class AdvertController implements IAdvertController {
  constructor(private readonly advertService: IAdvertService) {}

  async create(req: Request, res: Response): Promise<Response> {
    const result = advertRequestSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({ message: "Указаны неверные данные" })
    }

    const createdAdvert = await this.advertService.create(result.data)

    return res.json({
      message: "Объявление создано",
      advert: createdAdvert
    })
  }

  async getAdvert(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const advert = await this.advertService.getOne(id)

    return res.json({ advert })
  }

  async getAdverts(req: Request, res: Response): Promise<Response> {
    try {
      const {
        take,
        cursor,
        category,
        subcategory,
        profession,
        sphere,
        employment,
        userId,
        priceFrom,
        priceTo
      } = req.query

      const adverts = await this.advertService.getAdverts({
        take: take ? Number(take) : 10,
        ...(cursor && {
          cursor: { id: String(cursor) },
          skip: 1
        }),
        orderBy: { id: "desc" },
        where: {
          ...(category && { category: String(category) }),
          ...(subcategory && { subcategory: String(subcategory) }),
          ...(profession && { profession: String(profession) }),
          ...(sphere && { sphere: String(sphere) }),
          ...(employment && { employment: String(employment) }),
          ...(userId && { userId: String(userId) }),
          ...(priceFrom || priceTo
            ? {
                price: {
                  ...(priceFrom && { gte: BigInt(priceFrom as string) }),
                  ...(priceTo && { lte: BigInt(priceTo as string) })
                }
              }
            : {})
        },
        include: {
          pictures: true
        }
      })

      return res.json({
        items: adverts,
        nextCursor: adverts.length
          ? adverts[adverts.length - 1].id
          : null
      })
    } catch (error) {
      logger.error("Ошибка при получении объявлений", error)
      return res.status(500).json({
        message: "Failed to load adverts"
      })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await this.advertService.delete(id)
      return res.json({ message: "Объявление было успешно удалено" })
    } catch (error) {
      logger.error("Ошибка при удалении объявления", error)
      return res.status(500).json({ message: "Ошибка при удалении объявления" })
    }
  }
}
