import { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { AuthContext, WireContext } from './../pages/_app'
import { Button } from './button'
import { LoginButton } from './login_button'

export const AppNav = () => {
  const authContext = useContext(AuthContext)
  const wireContext = useContext(WireContext)
  const router = useRouter()

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      const user = await wireContext.googleAuthApi().auth(codeResponse.code)
      authContext.updateUser(user)
      router.push('/bookmark')
    },
    onError: errorResponse => console.error(errorResponse),
  })

  const onClickKoran = () => {
    router.push('/')
  }

  const onClickBookmark = () => {
    if (authContext.isLoggedIn()) {
      router.push('/bookmark')
    } else {
      googleLogin()
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
          Koran
        </Button>
        &nbsp;
        &nbsp;
        <Button
          onClick={onClickBookmark}
          disabled={!authContext.isLoggedIn()}
          style={{
            background: router.pathname === '/bookmark' ? 'gainsboro' : 'none'
          }}
        >
          Bookmark
        </Button>
      </div>
      <LoginButton />
    </div>
  )
}
