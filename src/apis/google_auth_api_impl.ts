import type { GoogleAuthApi } from './google_auth_api'
import type { User } from './../types/user'
import { getUrl } from '../utils/getUrl'

export class GoogleAuthApiImpl implements GoogleAuthApi {
  async auth(userAuthCode: string): Promise<User> {
    const auth = await fetch(getUrl("/auth/google"), {
      method: 'POST',
      body: JSON.stringify({
        auth_code: userAuthCode,
      }),
    })

    const json = await auth.json()

    const user: User = {
      email: json.data.email,
      token: json.data.token,
      name: json.data.name,
      picture: json.data.picture,
    }

    return Promise.resolve(user)
  }
}
