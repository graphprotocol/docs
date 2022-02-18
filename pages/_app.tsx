import { useCallback } from 'react'
import { AppProps } from 'next/app'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@edgeandnode/components'
import '@edgeandnode/components/build/components.css'

import { Layout } from '@/layout'
import { I18nContextProvider, defaultLocale, Locale, extractLocaleFromPath, prependLocale } from '@/i18n'
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
        url: 'https://storage.googleapis.com/graph-website/seo/graph-website.jpg',
        alt: 'The Graph',
      },
    ],
  },
  twitter: {
    handle: '@graphprotocol',
    site: '@graphprotocol',
    cardType: 'summary_large_image',
  },
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { locale, pathWithoutLocale } = extractLocaleFromPath(router.pathname)
  const currentLocale = locale ?? pageProps.locale ?? defaultLocale

  console.log({ routerPathname: router.pathname })
  console.log({ pathWithoutLocale })
  console.log({ locale })
  console.log({ pagePropsLocale: pageProps.locale })
  console.log({ defaultLocale })
  console.log({ currentLocale })

  useEffect(() => {
    document.documentElement.lang = currentLocale
  }, [currentLocale])

  seo.openGraph!.locale = currentLocale

  const setLocale = useCallback(
    (locale: Locale) => {
      router.push(prependLocale(pathWithoutLocale, locale))
    },
    [router, pathWithoutLocale]
  )

  return (
    <I18nContextProvider locale={currentLocale} setLocale={setLocale}>
      <ThemeProvider>
        <DefaultSeo {...seo} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </I18nContextProvider>
  )
}

export default MyApp
