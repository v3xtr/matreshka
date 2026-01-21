import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { logger } from '../../internal/adapter/logger/logger.js'
import { bootstrap } from '../../bootstrap.js'
import videoRoutes from '#delivery/http/router/media.routes.js'
import { Request, Response, NextFunction } from 'express'

const app = express()

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(cookieParser())

dotenv.config()

app.use("/api/videos", videoRoutes)
app.use((req: Request, _: Response, next: NextFunction) => {
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
