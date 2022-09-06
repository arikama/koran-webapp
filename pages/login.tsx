import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import type { NextPage } from 'next'

const LoginPage: NextPage = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      const auth = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google`, {
        method: 'POST',
        body: codeResponse.code,
      })
      const json = await auth.json()
      router.push('/')
    },
    onError: errorResponse => console.log(errorResponse),
  })
  const router = useRouter()
  return (
    <>
      <div>login page</div>
      <button onClick={googleLogin}>login with google</button>
    </>
  )
}

export default LoginPage
