import { render, screen } from '@testing-library/react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { AppNav } from '../../src/components/app_nav'

jest.mock('next/router', () => require('next-router-mock'))

describe('AppNav', () => {
  test('render', async () => {
    render(
      <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
        <AppNav />)
      </GoogleOAuthProvider>
    )
    expect(await screen.findByText('Koran')).toBeInTheDocument()
  })
})
