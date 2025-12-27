import express from 'express';
import session from 'express-session';
import passport from 'passport';
import oauthRoutes from '#delivery/http/routes/outh.routes.js'
import { GoogleStrategy } from '#internal/adapter/google-strategy/google-strategy.js';
import { GoogleOAuthService } from '#internal/service/oauth.service.js';
import { UserRepo } from '#internal/repo/user.repo.js';
import { prisma } from '#internal/adapter/prisma/prisma.js';
import { logger } from '#internal/logger/logger.js';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      accessToken?: string;
      refreshToken?: string;
    }
  }
}

const app = express();

app.use((req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  logger.info('Headers:', req.headers);
  next();
});

app.use((req, res, next) => {
  console.log('req.user:', req.user);
  console.log('req.session.passport:', req.session);
  next();
});

app.get('/auth/google', 
  passport.authenticate('google', { 
    scope: ['email', 'profile'],
    prompt: 'select_account'
  })
);


app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(oauthRoutes);


logger.info('Initializing Google Strategy...');

const userRepo = new UserRepo(prisma);
const googleOAuthService = new GoogleOAuthService(userRepo);
new GoogleStrategy(googleOAuthService).init();

passport.serializeUser((user: Express.User, done) => {
  logger.info('Serialize user:', user.id);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  logger.info('Deserialize user:', obj);
  done(null, obj as Express.User);
});

logger.info('Available routes:');
logger.info('GET /');
logger.info('GET /auth/google');
logger.info('GET /google/callback');
logger.info('GET /protected');
logger.info('GET /logout');
logger.info('GET /auth/failure');

app.use((req, res) => {
  logger.info('404 Not Found:', req.method, req.url);
  res.status(404).json({ 
    error: 'Not Found',
    path: req.url,
    method: req.method,
  });
});

app.listen(process.env.PORT, () => {
  logger.info('✅ Auth service started on port 8005');
  logger.info('🌐 http://localhost:8005');
  logger.info('🔗 Google OAuth: http://localhost:8005/auth/google');
  logger.info('🔄 Callback: http://localhost:8005/google/callback');
});
