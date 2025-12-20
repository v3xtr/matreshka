import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import authRoutes from '../../delivery/http/routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import { logger } from 'internal/adapter/logger/logger.js'
import { errorHandler } from '../../internal/middlewares/error.middleware.js'

dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())

app.use(cookieParser())


app.use("/api/auth", authRoutes)

app.use(errorHandler)

app.listen(process.env.PORT, () => logger.info(`server started on localhost:${process.env.PORT}`))
