import { useMemo, useCallback, useEffect } from 'react'
import { AppProps } from 'next/app'
import NextLink from 'next/link'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import {
  Layout,
  NavigationMarketing,
  Footer,
  Locale,
  defaultLocale,
  extractLocaleFromPath,
  I18nProvider,
  ThemeProvider,
  LocaleSwitcher,
} from '@edgeandnode/components'
import '@edgeandnode/components/build/components.css'

import { supportedLocales, translations } from '@/i18n'

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

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  seo.openGraph!.locale = locale

  const localeSwitcher = useMemo(() => <LocaleSwitcher key="localeSwitcher" />, [])

  return (
    <I18nProvider
      supportedLocales={supportedLocales}
      translations={translations}
      locale={locale ?? undefined}
      setLocale={setLocale}
      pathWithoutLocale={pathWithoutLocale}
    >
      <ThemeProvider>
        <DefaultSeo {...seo} />
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
          mainContainer
          headerContent={
            <NavigationMarketing activeRoute="/docs" NextLink={NextLink} rightAlignItems={[localeSwitcher]} />
          }
          footerContent={<Footer localeSwitcher={localeSwitcher} />}
        >
          <div>
            <Component {...pageProps} />
          </div>
        </Layout>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default MyApp
