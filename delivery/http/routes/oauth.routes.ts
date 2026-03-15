import { router } from '#internal/adapter/router/router.js';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

router.get('/api/oauth/vk', passport.authenticate('vk', { scope: ['email', 'profile'] }));

router.get("/api/oauth/vk/success", (_: Request, res: Response) => {
    res.json({ message: true })
})

router.get('api/oauth/vk/callback',
  passport.authenticate('vk', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.cookie('access_token', req.user?.accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.cookie('refresh_token', req.user?.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.redirect('http://localhost:8005/success');
  }
);

router.get('/api/oauth/vk/protected', (req: Request, res: Response) => {
  if (!req.user) return res.sendStatus(401);
  res.json({ user: req.user });
});

router.get('/api/oauth/vk/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.json({ message: 'Logged out' });
    });
  });
});

router.get('/api/oauth/vk/failure', (_: Request, res: Response) => {
  res.status(401).json({ error: 'Authentication failed' });
});

export default router
