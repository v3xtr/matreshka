import { Profile } from "passport";

export interface IGoogleOauthService {
  execute(profile: Profile): Promise<{ id: string; email: string }>
}
