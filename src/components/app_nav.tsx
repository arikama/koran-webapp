import React, { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { AuthContext, WireContext } from './../pages/app'
import { Button } from './button'
import GoogleLoginOptionsImpl from '../google/google_login_options_impl'
import { LoginButton } from './login_button'
import { STORAGE } from "../constants/storage"
import { onLoginSuccess } from '../utils/on_login_success'

export const AppNav = () => {
  const authContext = useContext(AuthContext)
  const wireContext = useContext(WireContext)
  const router = useRouter()
  const googleLoginOptions = new GoogleLoginOptionsImpl(wireContext.googleAuthApi())

  const googleLogin = useGoogleLogin(googleLoginOptions.authCodeFlowConfig(onLoginSuccess(authContext, router)))

  const onClickKoran = () => {
    router.push('/')
  }

  const onClickNav = (page: string) => {
    return () => {
      if (authContext.isLoggedIn()) {
        router.push(page)
      } else {
        window.localStorage.setItem(STORAGE.LOGIN_SUCCESS_PAGE_KEY, page)
        googleLogin()
      }
    }
  }

  return (
    <div
      id='app_nav'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 32
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '100%'
        }}
      >
        <Button
          onClick={onClickKoran}
          style={{
            background: (router.route === '/' || router.route === '/surahs/[id]') ? 'gainsboro' : 'none'
          }}
        >
          koran
        </Button>
        &nbsp;
        &nbsp;
        <Button
          onClick={onClickNav('/bookmark')}
          style={{
            background: router.pathname === '/bookmark' ? 'gainsboro' : 'none'
          }}
        >
          bookmark
        </Button>
        &nbsp;
        &nbsp;
        <Button
          onClick={onClickNav('/favs')}
          style={{
            background: router.pathname === '/favs' ? 'gainsboro' : 'none'
          }}
        >
          favorite
        </Button>
      </div>
      <LoginButton />
    </div>
  )
}
