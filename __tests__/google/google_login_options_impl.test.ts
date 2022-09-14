import { CodeResponse } from "@react-oauth/google"
import { waitFor } from '@testing-library/react'

import { GoogleAuthApiImpl } from "../../src/apis/google_auth_api_impl"
import GoogleLoginOptionsImpl from "../../src/google/google_login_options_impl"
import { User } from "../../src/types/user"

describe('GoogleLoginOptionsImpl', () => {
  const authMock = jest.fn()

  const googleAuthApiImpl = new GoogleAuthApiImpl()
  const googleLoginOptionsImpl = new GoogleLoginOptionsImpl(googleAuthApiImpl)

  beforeEach(() => {
    authMock.mockReset()
  })

  test('authCodeFlowConfig', async () => {
    const onSuccessMock = jest.fn()

    jest.spyOn(googleAuthApiImpl, 'auth').mockImplementationOnce(async () => {
      const user: User = {
        email: 'amir.ariffin@google.com',
        token: 'token',
        name: 'Amir',
        picture: 'https://lh3.googleusercontent.com/a/AItbvmkTDWeH-xnEOWmutU6_QH2-s5aSYogZsio9AqaqCpw=s96-c'
      }
      return user
    })

    const options = googleLoginOptionsImpl.authCodeFlowConfig(onSuccessMock)
    expect(options.flow).toEqual('auth-code')

    const codeResponse: CodeResponse = {
      scope: '',
      code: 'usercode'
    }

    options.onSuccess(codeResponse)
    options.onError(codeResponse)

    await waitFor(() => {
      expect(onSuccessMock).toBeCalledWith({
        "email": "amir.ariffin@google.com",
        "name": "Amir",
        "picture": "https://lh3.googleusercontent.com/a/AItbvmkTDWeH-xnEOWmutU6_QH2-s5aSYogZsio9AqaqCpw=s96-c",
        "token": "token"
      })
    })
  })
})
