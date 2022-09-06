import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId='454337127208-8cfsr6ebdake7qjp93n98rlrjjm9qgo6.apps.googleusercontent.com'
    >
      <div>
        <Link href='/'><a><u>index</u></a></Link>
      </div>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}

export default MyApp
