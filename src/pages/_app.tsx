import type { AppProps } from 'next/app'

import './../styles/globals.css'
import { AppNav } from './../components/app_nav'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppNav></AppNav>
      <br />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
