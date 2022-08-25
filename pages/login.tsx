import type { NextPage } from 'next'
import { GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

const LoginPage: NextPage = () => {
  const router = useRouter()
  return (
    <>
      <div>login page</div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          router.push('/')
        }}
        onError={() => {
          console.log('google login failed');
        }}
      />
    </>
  )
}

export default LoginPage
