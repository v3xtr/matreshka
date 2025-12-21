import { Request, Response, NextFunction } from 'express'
import { logger } from '../adapter/logger/logger.js'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.statusCode || 500
  const message = err.message || 'Внутренняя ошибка сервера'

  logger.error(err)

  res.status(status).json({
    success: false,
    message
  })
}
