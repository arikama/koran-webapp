import React from "react"

import App from "./app"

import "../styles/globals.css"

import type { AppProps } from "next/app"

declare global {
  interface Window {
    dataLayer?: {
      push: (data: Object) => boolean
    }
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  )
}

export default MyApp
