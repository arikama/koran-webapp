import { User } from "./user"

export type Auth = {
  user?: User
  updateUser: (user: User) => void
  isLoggedIn: () => boolean
}
