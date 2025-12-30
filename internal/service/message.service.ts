import { IMessageRepo } from "#internal/interfaces/message.repo.interface.js"
import { IRoomRepo } from "#internal/interfaces/room.repo.interface.js"

export class SendMessageService {
  constructor(
    private readonly roomRepo: IRoomRepo,
    private readonly messageRepo: IMessageRepo,
  ) {}

  async execute(input: {
    fromUserId: string
    toUserId: string
    text: string
  }) {
    if (!input.text.trim()) {
      throw new Error("Empty message")
    }

    const roomId = [input.fromUserId, input.toUserId].sort().join(":")
    const exists = await this.roomRepo.exists(roomId)

    if (!exists) {
      await this.roomRepo.create(roomId, [
        input.fromUserId,
        input.toUserId,
      ])
    }

    return this.messageRepo.create({
      roomId,
      userId: input.fromUserId,
      text: input.text,
    })
  }
}
