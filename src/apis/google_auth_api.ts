import type { User } from './../types/user'

export interface GoogleAuthApi {
  auth: (userAuthCode: string) => Promise<User>
}
