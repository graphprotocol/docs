import type { AppProps } from 'next/app'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import { ThemeProvider } from '@edgeandnode/components'
import '@edgeandnode/components/build/components.css'

import { Layout } from '@/layout'
import { useLocale } from '@/hooks'
import { defaultLocale } from '@/locale'
import { useEffect } from 'react'

const seo: DefaultSeoProps = {
  title: 'The Graph Docs',
  description: 'Browse the latest developer documentation including API reference, articles, and sample code',
  openGraph: {
    site_name: 'The Graph Docs',
    type: 'website',
    url: 'https://thegraph.com/docs/',
    locale: defaultLocale,
    images: [
      {
        // TODO: This image is wrong (Explorer, not Docs)
        url: 'https://storage.googleapis.com/graph-website/Graph%20Explorer%20SEO.png',
        alt: 'The Graph Docs',
      },
    ],
  },
  twitter: {
    handle: '@graphprotocol',
    site: '@graphprotocol',
    cardType: 'summary_large_image',
  },
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const { currentLocale } = useLocale()

  useEffect(() => {
    document.documentElement.lang = currentLocale
  }, [currentLocale])

  seo.openGraph!.locale = currentLocale

  return (
    <ThemeProvider>
      <DefaultSeo {...seo} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
