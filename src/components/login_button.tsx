import Image from 'next/image'
import { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { AuthContext, WireContext } from './../pages/_app'
import { Button } from './button'
import GoogleLoginOptionsImpl from '../google/google_login_options_impl'
import { SZ_32 } from './../constants/dimensions'
import { onLoginSuccess } from '../utils/on_login_success'

export const LoginButton = () => {
  const authContext = useContext(AuthContext)
  const wireContext = useContext(WireContext)
  const router = useRouter()
  const googleLoginOptions = new GoogleLoginOptionsImpl(wireContext.googleAuthApi())

  const googleLogin = useGoogleLogin(googleLoginOptions.authCodeFlowConfig(onLoginSuccess(authContext, router)))

  const Profile = () => {
    return (
      <Button
        onClick={() => {
          router.push('/profile')
        }}
      >
        <Image
          src={authContext.user?.picture!}
          alt='profile'
          height={SZ_32}
          width={SZ_32}
        />
      </Button>
    )
  }

  const Login = () => {
    return (
      <Button onClick={googleLogin}>Login</Button>
    )
  }

  return (
    <>
      {authContext.isLoggedIn() ? Profile() : Login()}
    </>
  )
}
