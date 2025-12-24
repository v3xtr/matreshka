import { ICommentController } from "#delivery/interfaces/http/comment.controller.interface.js";
import { ICommentService } from "#internal/interfaces/comment.service.interface.js";
import { CommentDTO } from "#internal/validation/dto/comment.dto.js";
import { CommentRequest } from "#internal/validation/zod/comment.validation.js";
import { Request, Response } from "express";
import { VideoComment } from "src/prisma/index.js";

export class CommentController implements ICommentController{
    constructor(private readonly commentService: ICommentService){}

    async create(req: Request, res: Response): Promise<Response>{
        const result = CommentRequest.safeParse(req.body)

        if(!result.success){
            return res.status(400).send({ message: "Неверные Данные" })
        }

        await this.commentService.createComment(result.data)

        return res.sendStatus(204)
    }

    async getByVideo(req: Request, res: Response): Promise<Response>{
        const { videoId } = req.body

        const comments: CommentDTO[] = await this.commentService.getComments(videoId)

        return res.json({ comments })
    }
}
