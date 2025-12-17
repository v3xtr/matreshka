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
app.use(express.json())
app.use(cookieParser())
app.use((req, _, next) => {
    console.log("REQUEST", req.method, req.path, req.body);
    next();
});

await bootstrap()

app.use("/api", profileRoutes)

app.listen(process.env.PORT, () => logger.info(`Server started on localhost:8001`))
