import { IOAuthService } from "#internal/interfaces/oauth.service.interface.js";
import crypto from 'crypto'
import { IUserRepo } from "#internal/interfaces/user.repo.interface.js";
import { UserEvenets } from "./user.events.js";
import { channel } from "#internal/adapter/rabbit/rabbit.js";
import { generateTokens } from "#pkg/generate.auth.tokens.js";
import { Profile } from "passport-vkontakte";

export class OAuthService implements IOAuthService{
    constructor(private readonly repo: IUserRepo){}

    async execute(profile: Profile): Promise<Express.User>{
        const email = profile.emails?.[0]?.value

        if(!email) throw new Error("VK Profile has no email")
        
        let user = await this.repo.findByEmail(email)

        let brokerPassword: string | undefined

        if(!user){
            brokerPassword = crypto.randomBytes(16).toString("hex")

            user = await this.repo.create({
                id: profile.id,
                name: profile.name?.familyName ? String(profile.name?.familyName) : "user",
                email,
                password: brokerPassword,
                phone: "+7782378237878"
            })

            await new UserEvenets(channel).sendToQueue(user)
        }

        const { accessToken, refreshToken } = generateTokens(user.id, user.email)

        return {
            id: user.id,
            email: user.email,
            name: user.name ?? "user",
            accessToken,
            refreshToken
        }

    }
}
