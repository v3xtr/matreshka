import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { logger } from '../../internal/adapter/logger/logger'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())



app.listen(process.env.PORT, () => logger.info(`Started on localhost:${process.env.PORT}`))
