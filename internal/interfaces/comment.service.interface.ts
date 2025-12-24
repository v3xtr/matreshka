import { CommentDTO } from "#internal/validation/dto/comment.dto.js";
import { CommentRequestType } from "#internal/validation/zod/comment.validation.js";

export interface ICommentService{
    createComment(data: CommentRequestType): Promise<void>
    getComments(videoId: string): Promise<CommentDTO[]>
}
