import { esClient } from "#internal/adapter/elastic/elastic.js"
import { IMessageElasticRepo } from "#internal/interfaces/message.elastic.repo.interface.js"
import { Message } from "src/prisma/client.js"

export class MessageElasticRepo implements IMessageElasticRepo {
  private index = "messages"

  async indexMessage(message: Message): Promise<void> {
    await esClient.index({
      index: this.index,
      id: message.id,
      document: {
        roomId: message.roomId,
        userId: message.userId,
        text: message.text,
        createdAt: message.createdAt,
      },
    })
  }

  async searchMessages(roomId: string, query: string, size = 50): Promise<Message[]> {
    const { hits } = await esClient.search({
      index: this.index,
      query: {
        bool: {
          must: [
            { match: { roomId } },
            { match: { text: query } },
          ],
        },
      },
      size,
      sort: [{ createdAt: { order: "desc" } }],
    })

    return hits.hits.map(hit => hit._source as Message)
  }
}
