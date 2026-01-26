import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import authRoutes from '../../delivery/http/routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import { logger } from '../../internal/adapter/logger/logger.js'
import { errorHandler } from '../../internal/middlewares/error.middleware.js'
import { connectRedis } from "../../internal/adapter/redis/redis.js";
import { MetricsCollector } from "../../internal/monitoring/prometheus.js";

dotenv.config()

const app = express()
const metrics = new MetricsCollector('auth-service')

app.use(metrics.getMiddleware())

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.get('/health', metrics.getHealthCheckHandler())

app.get('/metrics', metrics.getMetricsHandler())

app.use("/api/auth", authRoutes)

app.use(errorHandler)

await connectRedis()

app.listen(process.env.PORT, () => {
    logger.info(`server started on localhost:${process.env.PORT}`)
})