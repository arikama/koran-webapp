import type { UserApi } from './user_api'
import { getUrl } from '../utils/getUrl'

export class UserApiImpl implements UserApi {
  async getUserPointer(email: string, token: string): Promise<string> {
    const response = await fetch(getUrl("/user/pointer"), {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'x-access-token': token,
      }
    })

    const json = await response.json()

    return json.data.current_pointer
  }

  async advanceUserPointer(email: string, token: string): Promise<string> {
    const response = await fetch(getUrl("/user/pointer/advance"), {
      method: 'PATCH',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'x-access-token': token,
      }
    })

    const json = await response.json()

    return json.data.current_pointer
  }
}
