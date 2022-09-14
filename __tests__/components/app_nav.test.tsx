import { render, screen } from '@testing-library/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import userEvent from '@testing-library/user-event'

import { AuthContext, WireContext } from '../../src/pages/_app'
import { AppNav } from '../../src/components/app_nav'

import { GoogleAuthApi } from '../../src/apis/google_auth_api'
import type { Wire } from '../../src/types/wire'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const useGoogleLogin = jest.spyOn(require('@react-oauth/google'), 'useGoogleLogin')

describe('AppNav', () => {
  const isLoggedInMock = jest.fn()
  const updateUserMock = jest.fn()

  beforeEach(() => {
    isLoggedInMock.mockReset()
    updateUserMock.mockReset()
  })

  test('when logged in', async () => {
    const pushMock = jest.fn()
    const router = {
      push: pushMock
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
          isLoggedIn: isLoggedInMock.mockImplementation(() => true),
          updateUser: updateUserMock,
        }}
      >
        <GoogleOAuthProvider clientId={''}>
          <AppNav />)
        </GoogleOAuthProvider>
      </AuthContext.Provider>
    )

    const koranNav = await screen.findByText('Koran')

    expect(koranNav).toBeInTheDocument()
    expect(await userEvent.click(koranNav))
    expect(pushMock).toBeCalledWith('/')

    const bookmarkNav = await screen.findByText('Bookmark')

    expect(bookmarkNav).toBeInTheDocument()
    expect(await userEvent.click(bookmarkNav))
    expect(pushMock).toBeCalledWith('/bookmark')
  })

  test('when not logged in', async () => {
    const pushMock = jest.fn()
    const router = {
      push: pushMock
    }
    useRouter.mockImplementation(() => router)

    const googleLogin = jest.fn()
    useGoogleLogin.mockImplementationOnce(() => googleLogin)

    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedInMock.mockImplementation(() => false),
          updateUser: updateUserMock,
        }}
      >
        <GoogleOAuthProvider clientId={''}>
          <AppNav />)
        </GoogleOAuthProvider>
      </AuthContext.Provider>
    )

    const koranNav = await screen.findByText('Koran')

    expect(koranNav).toBeInTheDocument()
    expect(await userEvent.click(koranNav))
    expect(pushMock).toBeCalledWith('/')

    const bookmarkNav = await screen.findByText('Bookmark')

    expect(bookmarkNav).toBeInTheDocument()
    expect(await userEvent.click(bookmarkNav))
    expect(pushMock).toBeCalledWith('/')
  })
})
