import { CodeResponse } from "@react-oauth/google"

import { User } from "../types/user"

export interface GoogleLoginOptions {
  authCodeFlowConfig: (onSuccessCallback: (user: User) => void, onErrorCallback: (error: string) => void) => {
    flow?: "auth-code" | undefined
    onSuccess: (codeResponse: Omit<CodeResponse, "error" | "error_description" | "error_uri">) => void
    onError: (errorResponse: Pick<CodeResponse, "error" | "error_description" | "error_uri">) => void
  }
}
