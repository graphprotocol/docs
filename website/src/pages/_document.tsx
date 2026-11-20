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
      <Html
        {...getHtmlAttributesForLocale(locale)}
        // For Docsearch
        data-theme="dark"
        /**
         * We would set `bg-space-1800` here instead of on `body`, but our Tailwind setup generates selectors prefixed with `:scope ` for
         * specificity reasons, which means `html` will never be matched. But by setting it on `body`, we're not overriding GDS's default
         * `html` background color, which we can see outside the bounds of the page (e.g. when using rubber band scrolling). So we reset
         * the `html` background color to `initial`, which has the special behavior of using same background color as `body`.
         */
        style={{ backgroundColor: 'initial' }}
      >
        <Head>
          <link
            rel="preconnect"
            href={`https://${process.env.ALGOLIA_APP_ID}-dsn.algolia.net`}
            crossOrigin="anonymous"
          />
          <link rel="icon" type="image/png" sizes="64x64" href="https://storage.thegraph.com/favicons/64x64.png" />
          <link rel="icon" type="image/png" sizes="256x256" href="https://storage.thegraph.com/favicons/256x256.png" />
        </Head>
        <body className="bg-space-1800">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
