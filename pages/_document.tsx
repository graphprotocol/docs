import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

import { defaultLocale, extractLocaleFromPath, getHtmlAttributesForLocale, Locale } from '@edgeandnode/components'

type MyDocumentProps = DocumentInitialProps & {
  locale: Locale | null
}

export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const { locale } = extractLocaleFromPath(context.asPath ?? context.pathname)
    const initialProps = await Document.getInitialProps(context)
    const documentProps: MyDocumentProps = {
      ...initialProps,
      locale,
    }
    return documentProps
  }

  render() {
    const { locale } = this.props as MyDocumentProps

    return (
      <Html {...getHtmlAttributesForLocale(locale ?? defaultLocale)} data-theme="dark">
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
          <Script id="matomo" type="module" strategy="afterInteractive">{`
            const _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView'], ['enableLinkTracking'], ['setTrackerUrl', 'https://thegraph.matomo.cloud/matomo.php'], ['setSiteId', '1']);
            const g = document.createElement('script');
            g.async = true;
            g.src = '//cdn.matomo.cloud/thegraph.matomo.cloud/matomo.js';
            document.body.append(g);
          `}</Script>
          <Script id="pendo" type="module" strategy="afterInteractive">{`
            (function(p,e,n,d,o){
              var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
              v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
              o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
              y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/5eb7ddca-220c-4327-47bf-a1916db8f489/pendo.js';
              z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);
            })(window,document,'script','pendo');
            pendo.initialize();
          `}</Script>
        </body>
      </Html>
    )
  }
}
