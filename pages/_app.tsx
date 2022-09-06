import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      <Link href='/'>
        <h3><u>Koran</u></h3>
      </Link>
      <br />
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}

export default MyApp
