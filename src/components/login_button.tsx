import Image from 'next/image'
import { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { AuthContext } from './../pages/_app'
import { Button } from './button'
import { SZ_32 } from './../constants/dimensions'

import type { GoogleAuthApi } from './../apis/google_auth_api'
import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  googleAuthApi: GoogleAuthApi
}

export const LoginButton = (props: Props) => {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      const user = await props.googleAuthApi.auth(codeResponse.code)
      authContext.updateUser(user)
      router.push('/bookmark')
    },
    onError: errorResponse => console.error(errorResponse),
  })

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
