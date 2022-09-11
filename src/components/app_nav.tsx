import { useContext } from 'react'
import { useRouter } from 'next/router'

import { AuthContext } from './../pages/_app'
import { Button } from './button'
import { GoogleAuthApiImpl } from '../apis/google_auth_api_impl'
import { LoginButton } from './login_button'

import type { GoogleAuthApi } from '../apis/google_auth_api'

export const AppNav = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const googleAuthApi: GoogleAuthApi = new GoogleAuthApiImpl()

  const onClickKoran = () => {
    router.push('/')
  }

  const onClickBookmark = () => {
    if (authContext.isLoggedIn()) {
      router.push('/bookmark')
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 32
    }}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Button onClick={onClickKoran}>Koran</Button>
        &nbsp;
        &nbsp;
        <Button
          onClick={onClickBookmark}
          disabled={!authContext.isLoggedIn()}
        >
          Bookmark
        </Button>
      </div>
      <LoginButton googleAuthApi={googleAuthApi} />
    </div>
  )
}
