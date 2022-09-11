import Image from 'next/image'
import { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { AuthContext, WireContext } from './../pages/_app'
import { Button } from './button'
import { SZ_32 } from './../constants/dimensions'

export const LoginButton = () => {
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
