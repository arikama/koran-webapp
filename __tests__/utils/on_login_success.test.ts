import { useRouter as useNextRouter } from 'next/router'

import { getDefaultUser } from '../../src/testutils/get_default_user'
import { onLoginSuccess } from '../../src/utils/on_login_success'

import type { Auth } from '../../src/types/auth'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('onLoginSuccess', () => {
  const isLoggedInMock = jest.fn()
  const updateUserMock = jest.fn()

  beforeEach(() => {
    isLoggedInMock.mockReset()
    updateUserMock.mockReset()
  })

  test("push to /bookmark", () => {
    const auth: Auth = {
      updateUser: jest.fn(),
      isLoggedIn: jest.fn()
    }
    const pushMock = jest.fn()
    const router = {
      push: pushMock
    }

    window.localStorage.setItem("loginsuccesspagekey", "/bookmark")

    useRouter.mockImplementation(() => router)
    onLoginSuccess(auth, useNextRouter())(getDefaultUser())

    expect(pushMock).toBeCalledWith("/bookmark")
  })
})
