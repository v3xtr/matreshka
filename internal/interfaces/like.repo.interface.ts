export interface ILikeRepo {
  like(videoId: string, userId: string): Promise<void>
  unlike(videoId: string, userId: string): Promise<void>
  getLikesCount(videoId: string): Promise<number | null>
}
