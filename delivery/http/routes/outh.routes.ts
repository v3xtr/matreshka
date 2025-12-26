import { router } from '#internal/adapter/router/router.js';
import passport from 'passport';

router.get('/', (req, res) => res.json({ message: 'Auth service running on port 8005' }));

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get("/success", (req, res) => {
    res.json({ message: true })
})

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.cookie('access_token', req.user?.accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.cookie('refresh_token', req.user?.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.redirect('http://localhost:8005/success');
  }
);

router.get('/protected', (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.json({ user: req.user });
});

router.get('/logout', (req, res, next) => {
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

router.get('/auth/failure', (req, res) => {
  res.status(401).json({ error: 'Authentication failed' });
});

export default router
