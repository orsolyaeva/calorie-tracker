import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { FirebaseContextProvider, useFirebaseContext } from '../hooks/useFirebase'
import Header from '../components/header'
import React, { FC } from 'react'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <FirebaseContextProvider>
            <Header />
            <Component {...pageProps} />
        </FirebaseContextProvider>
    )
}
