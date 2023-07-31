import merge from 'lodash/merge'
import mixpanel from 'mixpanel-browser'
import { AppProps } from 'next/app'
import NextLink from 'next/link'
import { DefaultSeo, DefaultSeoProps } from 'next-seo'

import {
  AnalyticsProvider,
  ButtonOrLinkProps,
  defaultLocale,
  Footer,
  GDSProvider,
  I18nProvider,
  Layout,
  LocaleSwitcher,
  NavigationMarketing,
} from '@edgeandnode/gds'

import { supportedLocales, translations, useI18n } from '@/i18n'

import '@edgeandnode/gds/dist/style.css'
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

const internalHrefRegex = /^(#|\/(docs\/|(?=[^/])|$)|(https?:)?\/\/((www|staging)\.)?thegraph\.com\/docs\/)/

function MyAppWithLocale({ Component, pageProps, router }: AppProps) {
  const hideLocaleSwitcher = pageProps.hideLocaleSwitcher ?? false
  const localeSwitcher = hideLocaleSwitcher ? null : <LocaleSwitcher key="localeSwitcher" />
  const { locale, extractLocaleFromPath } = useI18n()

  const seoProps = merge(DEFAULT_SEO_PROPS, {
    openGraph: { locale },
  })

  return (
    <>
      <DefaultSeo {...seoProps} />
      <GDSProvider
        clientLink={NextLink}
        mapButtonOrLinkProps={<T extends ButtonOrLinkProps>(props: T) => {
          let href = typeof props.href === 'object' ? props.href.href : props.href

          if (!props.href || !href || href.startsWith('#')) {
            return props
          }

          // Determine if the link is internal and if so, ensure `href` is root-relative (starts with `/`)
          const internalHrefMatches = internalHrefRegex.exec(href)
          if (internalHrefMatches) {
            href = href.substring(internalHrefMatches[0].length - 1)
          }
          const isInternal = href.startsWith('/') && !href.startsWith('//')

          // If the link is internal and doesn't start with a locale, prepend the current locale
          // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
          if (isInternal) {
            const { locale: pathLocale, pathWithoutLocale } = extractLocaleFromPath(href)
            href = `/${pathLocale ?? locale}${pathWithoutLocale}`
          }

          // If the link is external, default the target to `_blank`
          const target = props.target ?? (!isInternal ? '_blank' : undefined)

          return { ...props, href, target }
        }}
      >
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
    </>
  )
}

function MyApp(props: AppProps) {
  return (
    <I18nProvider supportedLocales={supportedLocales} translations={translations} clientRouter={props.router}>
      <MyAppWithLocale {...props} />
    </I18nProvider>
  )
}

export default MyApp
