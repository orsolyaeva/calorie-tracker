import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'
import React, { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return null
    }

    return (
        <div id="appRoot">
            <Header />
            <Component {...pageProps} />
        </div>
    )
}
