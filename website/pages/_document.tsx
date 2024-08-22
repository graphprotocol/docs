import Document, { type DocumentContext, type DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'

import { defaultLocale, extractLocaleFromRouter, getHtmlAttributesForLocale, Locale } from '@edgeandnode/gds'

type MyDocumentProps = DocumentInitialProps & {
  locale: Locale | null
}

export default class MyDocument extends Document<MyDocumentProps> {
  static override async getInitialProps(context: DocumentContext) {
    const { locale } = extractLocaleFromRouter(context)
    const initialProps = await Document.getInitialProps(context)
    return {
      ...initialProps,
      locale: locale ?? defaultLocale,
    }
  }

  override render() {
    const { locale } = this.props

    return (
      <Html {...getHtmlAttributesForLocale(locale)} data-theme="dark">
        <Head>
          <link
            rel="preconnect"
            href={`https://${process.env.ALGOLIA_APP_ID}-dsn.algolia.net`}
            crossOrigin="anonymous"
          />
          <link rel="icon" type="image/png" sizes="64x64" href="https://storage.thegraph.com/favicons/64x64.png" />
          <link rel="icon" type="image/png" sizes="256x256" href="https://storage.thegraph.com/favicons/256x256.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
