import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId='454337127208-8cfsr6ebdake7qjp93n98rlrjjm9qgo6.apps.googleusercontent.com'
    >
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}

export default MyApp
