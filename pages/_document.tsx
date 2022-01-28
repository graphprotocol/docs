import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

import { extractLocaleFromPath } from '@/i18n'

export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const { locale } = extractLocaleFromPath(context.pathname)
    const initialProps = await Document.getInitialProps(context)
    return { ...initialProps, locale }
  }

  render() {
    const { locale } = this.props

    return (
      <Html lang={locale}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://storage.googleapis.com/graph-fonts/EuclidCircular/fonts.css" />
          <link rel="icon" type="image/png" href="https://storage.googleapis.com/graph-web/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
