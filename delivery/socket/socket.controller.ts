import { Server } from "socket.io"
import { SendMessageService } from "#internal/service/message.service.js"
import { prisma } from "#internal/adapter/prisma/prisma.js"
import { redisClient } from "#internal/adapter/redis/redis.js"
import { RoomRepo } from "#internal/repo/room.repo.js"
import { MessageCache } from "#internal/repo/message.cache.repo.js"
import { logger } from "#internal/adapter/logger/logger.js"
import { CachedMessageRepo } from "#internal/repo/cahed.message.repo.js"
import { MessageElasticRepo } from "#internal/repo/message.elastic.repo.js"
import { MessageRepo } from "#internal/repo/mesage.repo.js"
import { ReadStatusCache } from "#internal/repo/read.status.cache.repo.js"

const cachedMessageRepo = new CachedMessageRepo(
  new MessageRepo(prisma),
  new MessageCache(redisClient),
  new MessageElasticRepo(),
  new ReadStatusCache(redisClient)
)

const sendMessageService = new SendMessageService(
  new RoomRepo(prisma),
  cachedMessageRepo
)

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    logger.info("Client connected:", socket.id)

    socket.on("joinPrivateRoom", async (data: { userA: string, userB: string }) => {
      try {
        const roomId = [data.userA, data.userB].sort().join(":")
        socket.join(roomId)

        const messages = await cachedMessageRepo.findByRoom(roomId)
        socket.emit("roomMessages", { roomId, messages })

        await cachedMessageRepo.setReadStatus(roomId, data.userA)
        socket.to(roomId).emit("roomRead", { roomId, userId: data.userA, lastReadAt: new Date().toISOString() })
      } catch (err) {
        socket.emit("errorMessage", { message: "Failed to join room" })
      }
    })

    socket.on("sendMessage", async (data: { fromUserId: string, toUserId: string, text: string }) => {
      try {
        const message = await sendMessageService.execute({
          fromUserId: data.fromUserId,
          toUserId: data.toUserId,
          text: data.text
        })

        const roomId = [data.fromUserId, data.toUserId].sort().join(":")
        io.to(roomId).emit("newMessage", message)
      } catch (err) {
        socket.emit("errorMessage", { message: err instanceof Error ? err.message : "Send failed" })
      }
    })
    
    socket.on("disconnect", () => {
      logger.info("Client disconnected:", socket.id)
    })
  })
}
