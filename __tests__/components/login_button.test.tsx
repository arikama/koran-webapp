import { render, screen } from '@testing-library/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import userEvent from '@testing-library/user-event'

import { AuthContext } from '../../src/pages/app'
import { LoginButton } from '../../src/components/login_button'

const useGoogleLogin = jest.spyOn(require('@react-oauth/google'), 'useGoogleLogin')
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('LoginButton', () => {
  const isLoggedIn = jest.fn()
  const updateUser = jest.fn()
  const googleLogin = jest.fn()

  beforeEach(() => {
    isLoggedIn.mockReset()
    updateUser.mockClear()
    googleLogin.mockClear()
  })

  test('logging in', async () => {
    isLoggedIn.mockImplementationOnce(() => false)
    useGoogleLogin.mockImplementationOnce(() => googleLogin)

    render(
      <AuthContext.Provider
        value={{
          isLoggedIn,
          updateUser
        }}
      >
        <GoogleOAuthProvider clientId=''>
          <LoginButton></LoginButton>
        </GoogleOAuthProvider>
      </AuthContext.Provider>
    )

    const loginButton = screen.getByText('login')
    expect(loginButton).toBeInTheDocument()

    await userEvent.click(loginButton)
    expect(googleLogin).toBeCalledTimes(1)
  })

  test('when already logged in', async () => {
    isLoggedIn.mockImplementation(() => true)
    useGoogleLogin.mockImplementation(() => googleLogin)

    const push = jest.fn()
    const router = {
      push
    }
    useRouter.mockImplementation(() => router)

    render(
      <AuthContext.Provider
        value={{
          user: {
            email: 'amir.ariffin@google.com',
            token: 'token',
            name: 'Amir',
            picture: 'https://lh3.googleusercontent.com/a/AItbvmkTDWeH-xnEOWmutU6_QH2-s5aSYogZsio9AqaqCpw=s96-c'
          },
          isLoggedIn,
          updateUser
        }}
      >
        <GoogleOAuthProvider clientId=''>
          <LoginButton></LoginButton>
        </GoogleOAuthProvider>
      </AuthContext.Provider>
    )

    const profileImg = await screen.findByAltText('profile')
    expect(profileImg).toBeInTheDocument()

    await userEvent.click(profileImg)
    expect(push).toBeCalledTimes(1)
  })
})
