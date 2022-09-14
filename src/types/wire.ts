import { GoogleAuthApi } from "../apis/google_auth_api"
import { KoranApi } from "../apis/koran_api"
import { UserApi } from "../apis/user_api"

export type Wire = {
  koranApi: () => KoranApi
  userApi: () => UserApi
  googleAuthApi: () => GoogleAuthApi
}
