import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Link href='/'>
        <h3><u>Koran</u></h3>
      </Link>
      <br />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
