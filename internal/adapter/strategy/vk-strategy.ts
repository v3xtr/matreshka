import passport from 'passport'
import { Profile, Strategy, VerifyCallback } from 'passport-vkontakte'
import { Request } from 'express'
import { IOAuthService } from '#internal/interfaces/oauth.service.interface.js'

export class VkStrategy{
    constructor(private readonly oAuthService: IOAuthService){}
    
    init(){
       passport.use(
        new Strategy(
            {
                clientID: process.env.VKONTAKTE_APP_ID as string,
                clientSecret: process.env.VKONTAKTE_APP_SECRET as string,
                callbackURL: "http://localhost/auth/vk",
            },
            async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                const result = await this.oAuthService.execute(profile)
                done(null, result)
            } catch (error) {
                done(error as Error)
            }
                }
            )
        )
    }
}
