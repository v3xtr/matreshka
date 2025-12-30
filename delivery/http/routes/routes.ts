import express from "express";
import { ChatService } from "#internal/service/chat.service.js";
import { RoomService } from "#internal/service/room.service.js";
import { RoomRepo } from "#internal/repo/room.repo.js";
import { MessageRepo } from "#internal/repo/mesage.repo.js";
import { prisma } from "#internal/adapter/prisma/prisma.js";
import { ChatController } from "../chat.controller.js";
import { esClient } from "#internal/adapter/elastic/elastic.js";

const router = express.Router();

const roomRepo = new RoomRepo(prisma);
const messageRepo = new MessageRepo(prisma);

const roomService = new RoomService(roomRepo);
const chatService = new ChatService(roomRepo, messageRepo, esClient);
const chatController = new ChatController(chatService, roomService);

router.post("/rooms/private", chatController.getOrCreatePrivateRoom.bind(chatController));
router.get("/users/:userId/rooms", chatController.getUserRooms.bind(chatController));

router.get("/rooms/:roomId/messages", chatController.getMessages.bind(chatController));
router.get("/rooms/:roomId/messages/search", chatController.searchMessages.bind(chatController));

export default router;
