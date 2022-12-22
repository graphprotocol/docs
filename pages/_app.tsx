import merge from 'lodash/merge'
import { AppProps } from 'next/app'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import { useCallback, useMemo, useState } from 'react'
import useBus from 'use-bus'

import {
  defaultLocale,
  extractLocaleFromPath,
  Footer,
  I18nProvider,
  Layout,
  Locale,
  LocaleSwitcher,
  NavigationMarketing,
  ThemeProvider,
} from '@edgeandnode/components'

import { supportedLocales, translations, useI18n } from '@/i18n'

import { EventType } from '../types'

import '@edgeandnode/components/build/components.css'
import '@docsearch/css'

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
    const { locale, pathWithoutLocale } = extractLocaleFromPath(router.asPath.split(/[?#]/)[0])
    return {
      locale,
      pathWithoutLocale,
    }
  }, [router])

  const setLocale = useCallback(
    (locale: Locale) => {
      void router.push(`/${locale}${pathWithoutLocale}`)
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
    [router.events]
  )

  // Also disable smooth scrolling when the search is open
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  useBus(
    [EventType.SEARCH_OPEN, EventType.SEARCH_CLOSE],
    (event) => {
      setIsSearchOpen(event.type === EventType.SEARCH_OPEN)
    },
    [setIsSearchOpen]
  )

  return (
    <>
      <Script id="tracking" type="module">{`
        const _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView'], ['enableLinkTracking'], ['setTrackerUrl', 'https://thegraph.matomo.cloud/matomo.php'], ['setSiteId', '1']);
        const g = document.createElement('script');
        g.async = true;
        g.src = '//cdn.matomo.cloud/thegraph.matomo.cloud/matomo.js';
        document.body.append(g);
      `}</Script>
      <I18nProvider
        supportedLocales={supportedLocales}
        translations={translations}
        locale={locale}
        setLocale={setLocale}
        pathWithoutLocale={pathWithoutLocale}
      >
        <DefaultSeoWithLocale />
        <ThemeProvider disableSmoothScrolling={isSearchOpen ? true : disableSmoothScrolling} headComponent={Head}>
          <div sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div
              sx={{
                position: 'absolute',
                top: 0,
                insetInline: 0,
                minHeight: '768px',
                backgroundImage: `url('${process.env.BASE_PATH}/img/page-background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                '@media (min-width: 1440px)': {
                  aspectRatio: '1440/768',
                },
              }}
            />
          </div>
          <Layout
            headerSticky
            headerContent={
              <div dir="ltr">
                <NavigationMarketing activeRoute="/docs" NextLink={NextLink} rightAlignItems={[localeSwitcher]} />
              </div>
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
