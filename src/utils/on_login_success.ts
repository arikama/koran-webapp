import { NextRouter } from "next/router"

import type { Auth } from "../types/auth"
import { STORAGE } from "../constants/storage"
import type { User } from "../types/user"

export const onLoginSuccess = (authContext: Auth, router: NextRouter) => (user: User) => {
  authContext.updateUser(user)
  let page = window.localStorage.getItem(STORAGE.LOGIN_SUCCESS_PAGE_KEY) as string
  router.push(page ? page : '/')
}
