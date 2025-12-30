import { Request, Response } from "express";
import { ChatService } from "#internal/service/chat.service.js";
import { RoomService } from "#internal/service/room.service.js";
import { IChatController } from "#internal/interfaces/chat.controller.js";

export class ChatController implements IChatController{
  constructor(
    private readonly chatService: ChatService,
    private readonly roomService: RoomService
  ) {}

  async getOrCreatePrivateRoom(req: Request, res: Response): Promise<Response> {
    try {
      const { userA, userB } = req.body;
      if (!userA || !userB) return res.status(400).json({ error: "Missing user IDs" });

      const roomId = await this.roomService.getOrCreatePrivateRoom(userA, userB);
      return res.json({ roomId });
    } catch (err) {
      return res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
  }

  async getUserRooms(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId;
      const rooms = await this.roomService.getUserRooms(userId);
      return res.json({ rooms });
    } catch (err) {
      return res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
  }

  async getMessages(req: Request, res: Response): Promise<Response> {
    try {
      const roomId = req.params.roomId;
      const messages = await this.chatService.getMessages(roomId);
      return res.json({ messages });
    } catch (err) {
      return res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
  }

  async searchMessages(req: Request, res: Response): Promise<Response> {
    try {
        const { roomId } = req.params;
        const { q } = req.query;

        if (!q || typeof q !== "string") 
        return res.status(400).json({ error: "Missing query" });

        const messages = await this.chatService.searchMessages(roomId, q);

        return res.json({ messages });
    } catch (err) {
        return res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
}

}
