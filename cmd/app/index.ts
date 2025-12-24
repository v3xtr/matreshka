import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { logger } from '#internal/adapter/logger/logger.js'
import commentRoutes from '#delivery/http/routes/comment.routes.js'
import likeRoutes from '#delivery/http/routes/like.routes.js'
import { bootstrap } from '../../bootstrap.js'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/comments", commentRoutes)
app.use("/api", likeRoutes)

bootstrap()

app.listen(process.env.PORT, () => logger.info(`Server started on http://localhost:${process.env.PORT}`))
