import { useMemo, useCallback, useEffect } from 'react'
import { AppProps } from 'next/app'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@edgeandnode/components'
import '@edgeandnode/components/build/components.css'

import { Layout } from '@/layout'
import { I18nContextProvider, defaultLocale, extractLocaleFromPath, Locale } from '@/i18n'

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

  const { locale, pathWithoutLocale } = useMemo(() => {
    let { locale, pathWithoutLocale } = extractLocaleFromPath(router.asPath.split(/[?#]/)[0])
    return {
      locale: locale ?? defaultLocale,
      pathWithoutLocale,
    }
  }, [router])

  const setLocale = useCallback(
    (locale: Locale) => {
      router.push(`/${locale}${pathWithoutLocale}`)
    },
    [router, pathWithoutLocale]
  )

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  seo.openGraph!.locale = locale

  return (
    <I18nContextProvider locale={locale} setLocale={setLocale} pathWithoutLocale={pathWithoutLocale}>
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
