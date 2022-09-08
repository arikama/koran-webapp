import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'

import './../styles/globals.css'
import { AppNav } from './../components/app_nav'

type User = {
  token: string
}

type Auth = {
  user?: User
  updateUser?: (user: User) => void
}

export const AuthContext = React.createContext<Auth>({})

function MyApp({ Component, pageProps }: AppProps) {
  const [userState, setUserState] = useState<User>({ token: '' })
  return (
    <>
      <AuthContext.Provider value={{
        user: userState,
        updateUser: (user: User) => {
          setUserState(user)
        }
      }}>
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          <AppNav></AppNav>
          <br />
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </AuthContext.Provider>
    </>
  )
}

export default MyApp
