export interface IReadStatusCache {
  setLastRead(roomId: string, userId: string, timestamp: number): Promise<void>
  getLastRead(roomId: string, userId: string): Promise<number | null>
}
