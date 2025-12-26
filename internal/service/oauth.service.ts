import { IGoogleOauthService } from "#internal/interfaces/oauth.service.interface.js";
import { IUserRepo } from "#internal/interfaces/user.repo.interface.js";
import { generateTokens } from "#pkg/generate.auth.tokens.js";
import { Profile } from "passport-google-oauth20";
import { UserEvents } from "./user.events.js";
import { channel } from "#internal/adapter/rabbit/rabbit.js";

export class GoogleOAuthService implements IGoogleOauthService {
  constructor(private readonly repo: IUserRepo) {}

  async execute(profile: Profile): Promise<Express.User> {
    const email = profile.emails?.[0]?.value
    if (!email) throw new Error("Google profile has no email")

    let user = await this.repo.findByEmail(email)
    if (!user) {
      user = await this.repo.create({ id: profile.id, email })
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.email)

    await new UserEvents(channel).sendToQueue(user)

    return {
      id: user.id,
      email: user.email,
      accessToken,
      refreshToken
    }
  }
}
