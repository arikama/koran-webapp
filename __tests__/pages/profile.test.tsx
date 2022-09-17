import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AuthContext } from '../../src/pages/app'
import ProfilePage from '../../src/pages/profile'
import { User } from '../../src/types/user'

// https://github.com/vercel/next.js/issues/7479#issuecomment-512525335
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('ProfilePage', () => {
  const pushFn = jest.fn()
  const updateUserFn = jest.fn()

  beforeEach(() => {
    pushFn.mockReset()
    updateUserFn.mockReset()

    useRouter.mockImplementation(() => ({
      push: pushFn
    }))
  })

  test('visiting /profile when not logged in', () => {
    const isLoggedInMock = jest.fn()
    isLoggedInMock.mockImplementation(() => false)

    render(
      <AuthContext.Provider
        value={{
          updateUser: updateUserFn,
          isLoggedIn: isLoggedInMock
        }}
      >
        <ProfilePage />
      </AuthContext.Provider>
    )

    expect(isLoggedInMock).toBeCalledTimes(2)
    expect(pushFn).toBeCalledWith('/')
  })

  test('logout', async () => {
    const user: User = {
      email: 'amir.ariffin@google.com',
      token: 'token',
      name: 'Amir',
      picture: 'https://lh3.googleusercontent.com/a/AItbvmkTDWeH-xnEOWmutU6_QH2-s5aSYogZsio9AqaqCpw=s96-c'
    }

    const isLoggedInMock = jest.fn()
    isLoggedInMock.mockImplementation(() => true)

    render(
      <AuthContext.Provider
        value={{
          user,
          updateUser: updateUserFn,
          isLoggedIn: isLoggedInMock
        }}
      >
        <ProfilePage />
      </AuthContext.Provider>
    )

    expect(await screen.findByText('Amir')).toBeInTheDocument()
    expect(await screen.findByText('amir.ariffin@google.com')).toBeInTheDocument()

    const logoutButton = await screen.findByText('Logout')
    expect(logoutButton).toBeInTheDocument()

    await userEvent.click(logoutButton)

    expect(isLoggedInMock).toBeCalledTimes(2)
    expect(updateUserFn).toBeCalledWith({ email: '', token: '', name: '', picture: '' })
    expect(pushFn).toBeCalledWith('/')
  })
})
