import { IChatService } from "#internal/interfaces/chat.service.interface.js"
import { IMessageRepo } from "#internal/interfaces/message.repo.interface.js"
import { IRoomRepo } from "#internal/interfaces/room.repo.interface.js"
import { Message } from "src/prisma/client.js"
import { Client as ElasticClient } from "@elastic/elasticsearch"

export class ChatService implements IChatService {

  constructor(
    private readonly roomRepo: IRoomRepo,
    private readonly messageRepo: IMessageRepo,
    private readonly esClient: ElasticClient
  ) {
   
  }

  async getOrCreatePrivateRoom(userA: string, userB: string): Promise<string> {
    const roomId = [userA, userB].sort().join(":")
    const exists = await this.roomRepo.exists(roomId)
    if (!exists) {
      await this.roomRepo.create(roomId, [userA, userB])
    }
    return roomId
  }

  async getMessages(roomId: string): Promise<Message[]> {
    return this.messageRepo.findByRoom(roomId);
  }

  async searchMessages(roomId: string, query: string): Promise<Message[]> {
    const result = await this.esClient.search<Message>({
      index: "messages",
      query: {
        bool: {
          must: [
            { match: { roomId } },
            { match: { text: query } }
          ]
        }
      },
      sort: [{ createdAt: "desc" }],
      size: 50
    });

    return result.hits.hits.map(hit => hit._source!).filter(Boolean);
  }
}
