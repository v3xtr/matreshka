import { ICommentRepo } from "#internal/interfaces/comment.repo.interface.js";
import { ICommentService } from "#internal/interfaces/comment.service.interface.js";
import { CommentDTO } from "#internal/validation/dto/comment.dto.js";
import { CommentRequestType } from "#internal/validation/zod/comment.validation.js";

export class CommentService implements ICommentService{
    constructor(private readonly commentRepo: ICommentRepo){}

    async createComment(data: CommentRequestType): Promise<void>{
        await this.commentRepo.create(data)
    }

    async getComments(videoId: string): Promise<CommentDTO[]>{
        return await this.commentRepo.getByVideo(videoId)
    }
}
