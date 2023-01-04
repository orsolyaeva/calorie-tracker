import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'
import React, { useEffect, useState } from 'react'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})

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
            <style jsx global>{`
                html {
                    font-family: ${poppins.style.fontFamily};
                }
            `}</style>
            <Header />
            <Component {...pageProps} />
        </div>
    )
}
