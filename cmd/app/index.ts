import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { logger } from '#internal/adapter/logger/logger.js'
import commentRoutes from '#delivery/http/routes/comment.routes.js'
import likeRoutes from '#delivery/http/routes/like.routes.js'
import { bootstrap } from '../../bootstrap.js'
import feedRoutes from '#delivery/http/routes/feed.routes.js'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/comments", commentRoutes)
app.use("/api", likeRoutes)
app.use("/api/feed", feedRoutes)

bootstrap()

app.listen(process.env.PORT, () => logger.info(`Server started on http://localhost:${process.env.PORT}`))
