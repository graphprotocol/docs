import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { extractLocaleFromPath } from '@edgeandnode/components'

export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const { locale } = extractLocaleFromPath(context.asPath ?? context.pathname)
    const initialProps = await Document.getInitialProps(context)
    return { ...initialProps, locale }
  }

  render() {
    const { locale } = this.props

    return (
      <Html lang={locale} data-theme="dark">
        <Head>
          <link
            rel="preconnect"
            href={`https://${process.env.ALGOLIA_APP_ID}-dsn.algolia.net`}
            crossOrigin="anonymous"
          />
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
