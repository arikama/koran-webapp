import type { NextPage } from 'next'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

const LoginPage: NextPage = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      console.log('codeResponse', codeResponse);
      const auth = await fetch('http://localhost:8080/auth/google', {
        method: 'POST',
        body: codeResponse.code,
      })
      const json = await auth.json()
      console.log('json', json)
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
