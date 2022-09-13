import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AuthContext } from '../../src/pages/_app'
import ProfilePage from '../../src/pages/profile'
import { User } from '../../src/types/user'

jest.mock('next/router', () => require('next-router-mock'))

const user: User = {
  email: 'amir.ariffin@google.com',
  token: 'token',
  name: 'Amir',
  picture: ''
}

describe('ProfilePage', () => {
  test('logout', async () => {
    render(
      <AuthContext.Provider
        value={{
          user,
          updateUser: ({ email, token, name, picture }) => {
            user.email = email
            user.name = name
            user.token = token
            user.picture = picture
          },
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
    await waitFor(() => {
      expect(screen.queryByText('Amir')).not.toBeInTheDocument()
    })

    expect(screen.queryByText('amir.ariffin@google.com')).not.toBeInTheDocument()
    expect(logoutButton).not.toBeInTheDocument()
  })
})
