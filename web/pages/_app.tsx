import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {FirebaseContextProvider} from '../hooks/useFirebase';
import Header from "../components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <FirebaseContextProvider>
          <Header/>
        <Component {...pageProps} />
      </FirebaseContextProvider>
  )
}
