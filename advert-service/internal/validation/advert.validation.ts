import { z } from 'zod';

const BaseAdvertSchema = z.object({
    category: z.string().min(1, "Категория обязательна"),
    title: z.string().min(5, "Заголовок 5-200 символов").max(200),
    price: z.string()
        .min(1, "Укажите цену")
        .refine(price => {
            const lower = price.toLowerCase();
            if (['договорная', 'бесплатно', 'по договоренности', 'договорная цена'].includes(lower)) {
                return true;
            }
            const num = parseFloat(price.replace(/\s+/g, '').replace(',', '.'));
            return !isNaN(num) && num >= 0;
        }, {
            message: "Укажите число, 'договорная' или 'бесплатно'"
        }),
    description: z.string().min(10, "Описание 10-2000 символов").max(2000),
    address: z.string().min(5, "Адрес обязателен"),
    contacts: z.string().min(5, "Контакты обязательны"),
    userId: z.string().min(1, "User ID обязателен"),
    pictures: z.array(z.object({
        pictureUrl: z.string()
    })).min(1, "Нужно минимум 1 фото").max(10),
    services: z.array(z.object({
        text: z.string().min(1, "Текст услуги не может быть пустым")
    })).optional().default([]),
    workSchedule: z.array(z.object({
        fromDay: z.number().int().min(0).max(6),
        toDay: z.number().int().min(0).max(6),
        fromTime: z.string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Формат времени: ЧЧ:мм")
            .optional()
            .nullable(),
        toTime: z.string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Формат времени: ЧЧ:мм")
            .optional()
            .nullable(),
        is24h: z.boolean().default(false)
    })).optional().default([]),
    videoId: z.string()
        .nullable()
        .optional()
        .default(null),
});

export const AdvertCreateSchema = BaseAdvertSchema;

export const UpdateAdvertSchema = z.object({
    id: z.string().min(1, "ID обязателен"),
})
    .extend(
        BaseAdvertSchema
            .omit({ userId: true })
            .partial()
            .extend({
                pictures: z.array(z.object({
                    pictureUrl: z.string()
                })).max(10).optional(),
            }).shape
    )
    .refine(data => {
        const updateFields = Object.keys(data);
        return updateFields.length > 1;
    }, {
        message: "Должно быть хотя бы одно поле для обновления кроме advertId",
        path: ["root"]
    });

export type AdvertCreateSchemaType = z.infer<typeof AdvertCreateSchema>;
export type UpdateAdvertSchemaType = z.infer<typeof UpdateAdvertSchema>;