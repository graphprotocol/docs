import merge from 'lodash/merge'
import mixpanel from 'mixpanel-browser'
import { AppProps } from 'next/app'
import NextLink from 'next/link'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import { Folder, MetaJsonFile, NextraInternalGlobal, PageMapItem } from 'nextra'
// @ts-expect-error todo: fix type error
import { NEXTRA_INTERNAL } from 'nextra/constants'
import { useMemo } from 'react'

import {
  AnalyticsProvider,
  defaultLocale,
  Footer,
  GDSProvider,
  I18nProvider,
  Layout,
  Locale,
  LocaleSwitcher,
  NavigationMarketing,
  translate,
} from '@edgeandnode/components'

import { supportedLocales, translations, useI18n } from '@/i18n'

import '@edgeandnode/components/build/components.css'
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

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const localeSwitcher = useMemo(() => <LocaleSwitcher key="localeSwitcher" />, [])
  // @ts-expect-error todo: fix type error
  const __nextra_internal__ = (globalThis as NextraInternalGlobal)[NEXTRA_INTERNAL]

  const internal = __nextra_internal__.context?.[router.route]
  const hasMDXPage = !!internal
  const { pageOpts = {} } = internal || {}
  const locale = router.asPath.split('/')[1] as Locale

  pageOpts.headings = useMemo(() => {
    if (!hasMDXPage) return []
    return pageOpts.filePath === 'pages/[locale]/index.mdx'
      ? [
          {
            id: 'network-roles',
            value: translate(translations, locale, 'index.networkRoles.title'),
            depth: 2,
          },
          {
            id: 'products',
            value: translate(translations, locale, 'index.products.title'),
            depth: 2,
          },
          {
            id: 'supported-networks',
            value: translate(translations, locale, 'index.supportedNetworks.title'),
            depth: 2,
          },
        ]
      : pageOpts.headings
  }, [hasMDXPage, pageOpts.filePath, pageOpts.headings, locale])

  pageOpts.pageMap = useMemo(() => {
    if (!hasMDXPage) return []
    const pageMap = (__nextra_internal__.pageMap as PageMapItem[]).find(
      (pageItem): pageItem is Folder => pageItem.kind === 'Folder' && pageItem.name === locale
    )!.children
    pageMap.find((pageItem): pageItem is MetaJsonFile => pageItem.kind === 'Meta')!.data.index = translate(
      translations,
      locale,
      'index.title'
    )
    return pageMap
  }, [__nextra_internal__.pageMap, hasMDXPage, locale])

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
              <div dir="ltr">
                <NavigationMarketing activeRoute="/docs" NextLink={NextLink} rightAlignItems={[localeSwitcher]} />
              </div>
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
