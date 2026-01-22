import express from 'express'
import dotenv from 'dotenv'
import { logger } from '#internal/adapter/logger/logger.js'
import cors from 'cors'
import advertRoutes from '#delivery/http/routes/routes.js'
import { bootstrap } from "../../bootstrap.js";

dotenv.config()

const app = express()

app.use(cors())

app.use("/api/advert", advertRoutes)

await bootstrap()

app.listen(process.env.PORT, () => logger.info(`Server started on http://localhost:${process.env.PORT}`))
