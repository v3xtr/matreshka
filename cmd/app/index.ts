import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { logger } from '../../internal/adapter/logger/logger.js'
import { bootstrap } from '../../bootstrap.js'
import videoRoutes from '#delivery/http/router/video.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/videos", videoRoutes)
app.use((req, res, next) => {
    console.log('🌐 Входящий запрос:', {
        method: req.method,
        url: req.url,
        originalUrl: req.originalUrl,
        path: req.path,
        body: req.body,
        files: req.files,
        headers: req.headers['content-type']
    });
    next();
});
await bootstrap()

app.listen(process.env.PORT, () => logger.info(`Started on localhost:${process.env.PORT}`))
