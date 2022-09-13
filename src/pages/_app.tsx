import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Script from 'next/script'

import './../styles/globals.css'
import { AppNav } from './../components/app_nav'
import { GoogleAuthApi } from '../apis/google_auth_api'
import { GoogleAuthApiImpl } from '../apis/google_auth_api_impl'
import { KoranApiImpl } from './../apis/koran_api_impl'
import { UserApiImpl } from '../apis/user_api_impl'

import type { KoranApi } from '../apis/koran_api'
import type { User } from './../types/user'
import type { UserApi } from '../apis/user_api'

type Auth = {
  user?: User
  updateUser: (user: User) => void
  isLoggedIn: () => boolean
}

type Wire = {
  koranApi: () => KoranApi
  userApi: () => UserApi
  googleAuthApi: () => GoogleAuthApi
}

export const AuthContext = React.createContext<Auth>({
  updateUser: () => { },
  isLoggedIn: () => false,
})

export const WireContext = React.createContext<Wire>({
  koranApi: () => new KoranApiImpl(),
  userApi: () => new UserApiImpl(),
  googleAuthApi: () => new GoogleAuthApiImpl()
})

function MyApp({ Component, pageProps }: AppProps) {
  const [userState, setUserState] = useState<User>({
    email: '',
    token: '',
    name: '',
    picture: '',
  })
  return (
    <>
      <Script
        id='gtm'
        dangerouslySetInnerHTML={{
          __html:
            `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MCCNJVK');
            `
        }}
      />
      <AuthContext.Provider
        value={{
          user: userState,
          updateUser: (user: User) => {
            setUserState(user)
          },
          isLoggedIn: () => {
            return !!userState.token
          }
        }}
      >
        <WireContext.Provider
          value={{
            koranApi: () => new KoranApiImpl(),
            userApi: () => new UserApiImpl(),
            googleAuthApi: () => new GoogleAuthApiImpl()
          }}
        >
          <GoogleOAuthProvider
            clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
          >
            <AppNav></AppNav>
            <br />
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </WireContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default MyApp
