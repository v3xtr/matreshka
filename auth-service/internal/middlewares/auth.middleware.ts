// internal/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../adapter/prisma/prisma.js';
import { AuthRepo } from '../repo/auth.repo.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
  const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!ACCESS_SECRET || !REFRESH_SECRET) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : req.cookies?.access_token;

  const refreshToken = req.cookies?.refresh_token || 
    (req.headers['x-refresh-token'] as string | undefined);

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ 
      valid: false, 
      message: 'Требуется авторизация',
      redirectTo: '/login'
    });
  }

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, ACCESS_SECRET) as any;
      req.user = { id: decoded.id, email: decoded.email };
      return next();
    } catch (accessError) {
      console.log('Access token invalid, trying refresh token');
    }
  }

  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as any;
      const authRepo = new AuthRepo(prisma);
      const user = await authRepo.getUserByLogin(decoded.email);

      if (!user) {
        return res.status(401).json({ 
          valid: false, 
          message: 'Пользователь не найден',
          redirectTo: '/login'
        });
      }

      req.user = { id: user.id, email: user.email };
      return next();
    } catch (refreshError) {
      return res.status(401).json({ 
        valid: false, 
        message: 'Токен недействителен',
        redirectTo: '/login'
      });
    }
  }

  return res.status(401).json({ 
    valid: false, 
    message: 'Требуется авторизация',
    redirectTo: '/login'
  });
}
