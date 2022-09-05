import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Container from '@mui/material/Container'
import Link from 'next/link'
import MuiLink from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId='454337127208-8cfsr6ebdake7qjp93n98rlrjjm9qgo6.apps.googleusercontent.com'
    >
      <Container>
        <Link href='/'><a>index</a></Link>
        <Divider></Divider>
        <Component {...pageProps} />
      </Container>
    </GoogleOAuthProvider>
  )
}

export default MyApp
