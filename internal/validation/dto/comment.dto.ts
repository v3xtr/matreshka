export interface CommentDTO {
    id: string,
    userId: string,
    text: string,
    parentId: string | null,
    createdAt: Date
}
