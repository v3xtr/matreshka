import jwt from 'jsonwebtoken';

export async function generateTokens(id: string) {
  const accessToken = jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' } );

  const refreshToken = jwt.sign({ userId: id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });

  return { accessToken, refreshToken };
}
