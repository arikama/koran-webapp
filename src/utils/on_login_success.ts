import { NextRouter } from "next/router"

import type { Auth } from "../types/auth"
import type { User } from "../types/user"

export const onLoginSuccess = (authContext: Auth, router: NextRouter) => (user: User) => {
  authContext.updateUser(user)
  router.push('/bookmark')
}
