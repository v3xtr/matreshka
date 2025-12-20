import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import profileRoutes from "#delivery/http/routes/routes.js"
import { bootstrap } from '../../bootstrap.js'
import { logger } from '#internal/adapter/logger/logger.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser())
app.use((req, _, next) => {
    logger.info("REQUEST", req.method, req.path, req.body);
    next();
});

app.use(express.urlencoded({ limit: '10mb', extended: true }));

await bootstrap()

app.use("/api", profileRoutes)

app.listen(process.env.PORT, () => logger.info(`Server started on localhost:8001`))
