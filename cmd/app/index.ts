import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { registerSocketHandlers } from '#delivery/socket/socket.controller.js'
import { bootstrap } from '../../bootstrap.js'
import { logger } from '#internal/adapter/logger/logger.js'
import chatRoutes from '#delivery/http/routes/routes.js'

dotenv.config()

const app = express()
const server = http.createServer(app)

export const io = new Server(server, {
  cors: { origin: '*' },
})

app.use(cors())

app.use(express.json())
app.use("/api", chatRoutes)

registerSocketHandlers(io)
bootstrap()

server.listen(process.env.PORT, () => {
  logger.info(`Chat service started on http://localhost:${process.env.PORT}`)
})
