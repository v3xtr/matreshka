
export interface IAuthCacheRepo {
    storeCode(userId: string, code: string): Promise<number>
    getCode(userId: string): Promise<string | null>
}