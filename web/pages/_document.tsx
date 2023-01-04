import Document, { DocumentContext, DocumentInitialProps, Html, Main, Head, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        return await Document.getInitialProps(ctx)
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'} />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                        rel="preload"
                        as="style"
                    /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
