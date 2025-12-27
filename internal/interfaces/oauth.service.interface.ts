import { Profile } from "passport-vkontakte";

export interface IOAuthService{
    execute(profile: Profile): Promise<Express.User>
}
