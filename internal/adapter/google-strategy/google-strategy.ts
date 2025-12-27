import passport from 'passport'
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20'
import { Request } from 'express'
import { IGoogleOauthService } from '#internal/interfaces/oauth.service.interface.js'

export class GoogleStrategy {
  constructor(
    private readonly googleOAuthService: IGoogleOauthService
  ) {}

  init() {
    passport.use(
      new Strategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: "http://localhost:8005/google/callback",
          passReqToCallback: true
        },
        async (_: Request, __: string, ___: string, profile: Profile, done: VerifyCallback) => {
          try {
            const result = await this.googleOAuthService.execute(profile)
            done(null, result)
          } catch (err) {
            done(err as Error)
          }
        }
      )
    )
  }
}
