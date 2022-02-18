import { createContext, Context, useMemo, useCallback, useEffect } from 'react'
import { AppProps } from 'next/app'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@edgeandnode/components'
import '@edgeandnode/components/build/components.css'

import { Layout } from '@/layout'
import { I18nContextProvider, defaultLocale, Locale } from '@/i18n'

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

export const AppContext = createContext(null) as Context<{
  pathWithoutPrefix: string
} | null>

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const locale = pageProps.locale

  const pathWithoutPrefix = useMemo(() => {
    const pathParts = router.asPath.split(/[?#]/)[0].split('/').filter(Boolean)
    pathParts.shift() // remove the locale
    for (let i = 0; i < (process.env.APP_PREFIX!.match(/\//g)?.length ?? 0); i++) {
      pathParts.shift() // remove the app prefix
    }
    return `/${pathParts.join('/')}`
  }, [router])

  const setLocale = useCallback(
    (locale: Locale) => {
      router.push(`/${locale}${process.env.APP_PREFIX}${pathWithoutPrefix}`)
    },
    [router, pathWithoutPrefix]
  )

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  seo.openGraph!.locale = locale

  return (
    <AppContext.Provider value={{ pathWithoutPrefix }}>
      <I18nContextProvider locale={locale} setLocale={setLocale}>
        <ThemeProvider>
          <DefaultSeo {...seo} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </I18nContextProvider>
    </AppContext.Provider>
  )
}

export default MyApp
