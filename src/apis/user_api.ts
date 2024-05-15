export interface UserApi {
  getUserPointer: (email: string, token: string) => Promise<string>
  advanceUserPointer: (email: string, token: string) => Promise<string>
  reverseUserPointer: (email: string, token: string) => Promise<string>
}
