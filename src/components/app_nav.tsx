import Link from 'next/link'
import { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { AuthContext } from './../pages/_app'
import { Button } from './button'

export const AppNav = () => {
  const authContext = useContext(AuthContext)
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      const auth = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google`, {
        method: 'POST',
        body: codeResponse.code,
      })
      const json = await auth.json()
      console.log('json', json)
      authContext.updateUser!({ token: json.token })
    },
    onError: errorResponse => console.log(errorResponse),
  })
  const router = useRouter()
  const login = <div onClick={googleLogin}><Button title='🚪' onClick={googleLogin} /></div>
  const profile = <div onClick={() => {
    router.push('/profile')
  }}><Button title='👤' onClick={() => { router.push('/profile') }} /></div>
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <Button title='📖' onClick={() => { router.push('/') }} />
      {authContext.user?.token ? profile : login}
    </div>
  )
}
