import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {FirebaseContextProvider} from '../hooks/useFirebase';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <FirebaseContextProvider>
        <Component {...pageProps} />
      </FirebaseContextProvider>
  )
}
