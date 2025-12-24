import { CommentDTO } from "#internal/validation/dto/comment.dto.js"
import { CommentRequestType } from "#internal/validation/zod/comment.validation.js"

export interface ICommentRepo {
  create(data: CommentRequestType): Promise<void>
  getByVideo(videoId: string): Promise<CommentDTO[]>
}
