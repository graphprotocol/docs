import merge from 'lodash/merge'
import mixpanel from 'mixpanel-browser'
import { AppProps } from 'next/app'
import NextLink from 'next/link'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import { ReactElement, useMemo } from 'react'

import {
  AnalyticsProvider,
  defaultLocale,
  Footer,
  GDSProvider,
  I18nProvider,
  Layout,
  LocaleSwitcher,
  NavigationMarketing,
} from '@edgeandnode/gds'

import { supportedLocales, translations, useI18n } from '@/i18n'

import '@edgeandnode/gds/dist/components.css'
import '@docsearch/css'

const DEFAULT_SEO_PROPS: DefaultSeoProps = {
  title: 'The Graph Docs',
  description: 'Browse the latest developer documentation including API reference, articles, and sample code',
  openGraph: {
    siteName: 'The Graph Docs',
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
        openGraph: { locale },
      }),
    [locale]
  )

  return <DefaultSeo {...seoProps} />
}

function MyApp({ Component, pageProps, router }: AppProps): ReactElement {
  const hideLocaleSwitcher = pageProps.hideLocaleSwitcher ?? false
  const localeSwitcher = hideLocaleSwitcher ? null : <LocaleSwitcher key="localeSwitcher" />

  return (
    <I18nProvider supportedLocales={supportedLocales} translations={translations} clientRouter={router}>
      <DefaultSeoWithLocale />
      <GDSProvider clientLink={NextLink}>
        <AnalyticsProvider
          app="DOCS"
          clientRouter={router}
          mixpanel={{
            sdk: mixpanel,
            token: process.env.MIXPANEL_TOKEN ?? null,
          }}
        >
          <div sx={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}>
            <div
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
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
              <NavigationMarketing
                activeRoute="/docs"
                NextLink={NextLink}
                rightAlignItems={localeSwitcher ? [localeSwitcher] : undefined}
              />
            }
            mainContainer
            footerContent={<Footer localeSwitcher={localeSwitcher} />}
          >
            <Component {...pageProps} />
          </Layout>
        </AnalyticsProvider>
      </GDSProvider>
    </I18nProvider>
  )
}

export default MyApp
