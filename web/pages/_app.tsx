import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'
import React, { useEffect, useState } from 'react'
// import { Poppins } from '@next/font/google'
import Head from 'next/head'

// const poppins = Poppins({
//     weight: ['400', '500', '600', '700'],
//     subsets: ['latin'],
// })

export default function App({ Component, pageProps }: AppProps) {
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return null
    }

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta name="description" content="BeFit, a fitness tracking application." />
                <meta name="keywords" content="fitness, calorie, nutrition, track, tracker, progress" />
                <title>BeFit - Calorie Tracker</title>

                <link rel="manifest" href="/manifest.json" />
                <link href="/icons/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/icons/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
                <meta name="theme-color" content="#FFFFFF" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'} />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                    rel="preload"
                    as="style"
                />

                {/*<style jsx global>{`*/}
                {/*    html {*/}
                {/*        font-family: ${poppins.style.fontFamily};*/}
                {/*    }*/}
                {/*`}</style>*/}
            </Head>
            <div id="appRoot">
                <Header />
                <Component {...pageProps} />
            </div>
        </>
    )
}
