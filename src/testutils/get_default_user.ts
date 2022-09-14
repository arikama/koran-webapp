import { User } from "../types/user"

export function getDefaultUser(): User {
  return {
    email: 'amir.ariffin@google.com',
    token: 'token',
    name: 'Amir',
    picture: 'https://lh3.googleusercontent.com/a/AItbvmkTDWeH-xnEOWmutU6_QH2-s5aSYogZsio9AqaqCpw=s96-c'
  }
}
