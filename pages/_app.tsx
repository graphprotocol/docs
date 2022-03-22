import { useMemo, useCallback, useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import NextLink from 'next/link'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import {
  I18nProvider,
  ThemeProvider,
  Layout,
  NavigationMarketing,
  Footer,
  Locale,
  LocaleSwitcher,
  defaultLocale,
  extractLocaleFromPath,
} from '@edgeandnode/components'
import '@edgeandnode/components/build/components.css'
import { merge } from 'lodash-es'

import { supportedLocales, translations, useI18n } from '@/i18n'

const DEFAULT_SEO_PROPS: DefaultSeoProps = {
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

const DefaultSeoWithLocale = () => {
  const { locale } = useI18n()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const seoProps = useMemo(
    () =>
      merge(DEFAULT_SEO_PROPS, {
        openGraph: {
          locale,
        },
      }),
    [locale]
  )

  return <DefaultSeo {...seoProps} />
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const { locale, pathWithoutLocale } = useMemo(() => {
    let { locale, pathWithoutLocale } = extractLocaleFromPath(router.asPath.split(/[?#]/)[0])
    return {
      locale,
      pathWithoutLocale,
    }
  }, [router])

  const setLocale = useCallback(
    (locale: Locale) => {
      router.push(`/${locale}${pathWithoutLocale}`)
    },
    [router, pathWithoutLocale]
  )

  const localeSwitcher = useMemo(() => <LocaleSwitcher key="localeSwitcher" />, [])

  // Disable smooth scrolling while switching routes
  const disableSmoothScrolling = useCallback(
    (disableFn) => {
      router.events.on('routeChangeStart', disableFn)
      return () => router.events.off('routeChangeStart', disableFn)
    },
    [router]
  )

  return (
    <>
      <I18nProvider
        supportedLocales={supportedLocales}
        translations={translations}
        locale={locale}
        setLocale={setLocale}
        pathWithoutLocale={pathWithoutLocale}
      >
        <DefaultSeoWithLocale />
        <ThemeProvider disableSmoothScrolling={disableSmoothScrolling} headComponent={Head}>
          <div
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              minHeight: '768px',
              backgroundImage: `url('${process.env.BASE_PATH}/img/page-background.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              '@media (min-width: 1440px)': {
                aspectRatio: '1440/768',
              },
            }}
          />
          <Layout
            headerSticky
            headerContent={
              <NavigationMarketing activeRoute="/docs" NextLink={NextLink} rightAlignItems={[localeSwitcher]} />
            }
            mainContainer
            footerContent={<Footer localeSwitcher={localeSwitcher} />}
          >
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </I18nProvider>
    </>
  )
}

export default MyApp
