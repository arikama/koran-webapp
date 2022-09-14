import { CodeResponse } from "@react-oauth/google"

import { GoogleAuthApi } from "../apis/google_auth_api"
import { GoogleLoginOptions } from "./google_login_options"
import { User } from "../types/user"

export default class GoogleLoginOptionsImpl implements GoogleLoginOptions {
  private googleAuthApi: GoogleAuthApi

  constructor(googleAuthApi: GoogleAuthApi) {
    this.googleAuthApi = googleAuthApi
  }

  authCodeFlowConfig(onSuccessCallback: (user: User) => void, onErrorCallback: (error: string) => void) {
    return {
      flow: "auth-code" as "auth-code",
      onSuccess: (codeResponse: Omit<CodeResponse, "error" | "error_description" | "error_uri">) => {
        this.googleAuthApi.auth(codeResponse.code).then(user => {
          onSuccessCallback(user)
        })
        return null
      },
      onError: (errorResponse: Pick<CodeResponse, "error" | "error_description" | "error_uri">) => {
        onErrorCallback(errorResponse.error_description || '')
        return null
      }
    }
  }
}
