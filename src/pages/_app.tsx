import React, { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Head from "next/head"
import Script from "next/script"
import { useRouter } from "next/router"

import { AppNav } from "../components/app_nav"
import { Break } from "../components/break"
import { GoogleAuthApiImpl } from "../apis/google_auth_api_impl"
import { KoranApiImpl } from "../apis/koran_api_impl"
import { STORAGE } from "../constants/storage"
import { UserApiImpl } from "../apis/user_api_impl"
import { triggerGtmPageview } from "../utils/trigger_gtm_pageview"

import "../styles/globals.css"

import type { Auth } from "../types/auth"
import type { User } from "../types/user"
import type { Wire } from "../types/wire"

declare global {
  interface Window {
    dataLayer?: {
      push: (data: Object) => boolean
    }
  }
}

export const AuthContext = React.createContext<Auth>({
  updateUser: () => { return null },
  isLoggedIn: () => false,
})

export const WireContext = React.createContext<Wire>({
  koranApi: () => new KoranApiImpl(),
  userApi: () => new UserApiImpl(),
  googleAuthApi: () => new GoogleAuthApiImpl()
})

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [user, setUser] = useState<User>({
    email: "",
    token: "",
    name: "",
    picture: "",
  })

  useEffect(() => {
    triggerGtmPageview()
  }, [router.pathname])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userBlob = window.localStorage.getItem(STORAGE.USER_LOCAL_STORAGE_KEY)
      if (userBlob) {
        if (!user.token) {
          setUser(JSON.parse(userBlob) as User)
        }
      }
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <>
      <Head>
        <title>Koran</title>
      </Head>
      <Script
        id="gtm"
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
          user: user,
          updateUser: (user: User) => {
            if (typeof window !== "undefined" && user) {
              window.localStorage.setItem(STORAGE.USER_LOCAL_STORAGE_KEY, JSON.stringify(user))
            }
            setUser(user)
          },
          isLoggedIn: () => {
            return !!user.token
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
            <Break />
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </WireContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default MyApp
