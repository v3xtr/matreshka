import jwt from 'jsonwebtoken'

export function generateTokens(userId: string, email: string){
    const accessToken: string = jwt.sign({ userId, email }, process.env.ACCESS_SECRET as string, { expiresIn: "15m" })
    const refreshToken: string = jwt.sign({ userId, email }, process.env.REFRESH_SECRET as string,  { expiresIn: "7d" })
    return { accessToken, refreshToken }
}
