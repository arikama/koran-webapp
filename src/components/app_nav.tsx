import Image from 'next/image'
import { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { AuthContext } from './../pages/_app'

export const AppNav = () => {
  const authContext = useContext(AuthContext)
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      const auth = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google`, {
        method: 'POST',
        body: JSON.stringify({
          auth_code: codeResponse.code,
        }),
      })
      const json = await auth.json()
      console.log('json', json)
      authContext.updateUser!({ token: json.data.token })
    },
    onError: errorResponse => console.log(errorResponse),
  })
  const router = useRouter()

  const Login = () => {
    return (
      <u onClick={googleLogin}>Login</u>
    )
  }

  const Profile = () => {
    return (
      <div
        onClick={() => {
          router.push('/profile')
        }}
      >
        <Image
          src='https://lh3.googleusercontent.com/a/AItbvmlt4GCRygWBd5a9TU3yYaJd7nXLzY-_TcsqxMq-=s96-c'
          alt='profile'
          height={32}
          width={32}
        />
      </div>
    )
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
        <u onClick={() => { router.push('/') }}>Koran</u>
        &nbsp;
        &nbsp;
        <u onClick={() => { router.push('/bookmark') }}>Bookmark</u>
      </div>
      {authContext.user?.token ? Profile() : Login()}
    </div>
  )
}
