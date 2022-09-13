import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AuthContext } from '../../src/pages/_app'
import ProfilePage from '../../src/pages/profile'
import { User } from '../../src/types/user'

// https://github.com/vercel/next.js/issues/7479#issuecomment-512525335
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('ProfilePage', () => {
  test('logout', async () => {
    const pushFn = jest.fn()
    const updateUserFn = jest.fn()

    useRouter.mockImplementation(() => ({
      push: pushFn
    }))

    const user: User = {
      email: 'amir.ariffin@google.com',
      token: 'token',
      name: 'Amir',
      picture: 'https://lh3.googleusercontent.com/a/AItbvmkTDWeH-xnEOWmutU6_QH2-s5aSYogZsio9AqaqCpw=s96-c'
    }

    render(
      <AuthContext.Provider
        value={{
          user,
          updateUser: updateUserFn,
          isLoggedIn: () => user.token !== ''
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

    expect(updateUserFn).toBeCalledWith({ email: '', token: '', name: '', picture: '' })
    expect(pushFn).toBeCalledWith('/')
  })
})
