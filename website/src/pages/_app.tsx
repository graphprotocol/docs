import mixpanel from 'mixpanel-browser'
import type { AppProps } from 'next/app'
import NextLink from 'next/link'
import { DefaultSeo } from 'next-seo'
import googleAnalytics from 'react-ga4'

import {
  AnalyticsProvider,
  type ButtonOrLinkProps,
  defaultLocale,
  extractLocaleFromPath,
  extractLocaleFromRouter,
  GDSProvider,
  I18nProvider,
} from '@edgeandnode/gds'
import { CookieBanner } from '@edgeandnode/go'

import { supportedLocales, translations } from '@/i18n'

import '@edgeandnode/gds/style.css'
import '@docsearch/css'
import '@/app.css'

// Match either:
// 1. URLs that start with `/` followed by an optional path or query (root-relative URLs)
// 2. URLs that start with `http(s)://(www.|staging.)thegraph.com`, followed by an optional path/query
const rootRelativeOrTheGraphUrlRegex =
  /^(?:\/(?!\/)|(?:(?:https?:)?\/\/(?:(?:www|staging)\.)?thegraph\.com)(?:$|\/|\?))(.+)?/i

// Match URLs that start with a protocol/scheme or `//`
const absoluteUrlRegex = /^(?:[a-zA-Z][a-zA-Z\d+.-]*:|\/\/)/

export default function MyApp({ Component, router, pageProps }: AppProps) {
  const { locale } = extractLocaleFromRouter(router, supportedLocales)

  return (
    <>
      <DefaultSeo
        title="Docs | The Graph"
        description="Browse the latest developer documentation including API reference, articles, and sample code"
        openGraph={{
          type: 'website',
          locale: locale ?? defaultLocale,
          url: 'https://thegraph.com/',
          siteName: 'The Graph',
          images: [
            {
              url: 'https://thegraph-docs-opengraph-image.the-guild.dev',
              alt: 'The Graph',
            },
          ],
        }}
        twitter={{
          handle: '@graphprotocol',
          site: '@graphprotocol',
          cardType: 'summary_large_image',
        }}
      />
      <GDSProvider
        clientRouter={router}
        clientLink={NextLink}
        mapButtonOrLinkProps={(props) => {
          // Only continue if `href` is set to a string that is not an anchor on the same page
          if (!props.href || typeof props.href === 'object' || props.href.startsWith('#')) {
            return props
          }

          let { href, target } = props as ButtonOrLinkProps.ExternalLinkProps

          const matches = rootRelativeOrTheGraphUrlRegex.exec(href)
          if (matches?.length) {
            const path = matches[1] ? (matches[1].startsWith('/') ? matches[1] : `/${matches[1]}`) : '/'
            const basePath = process.env.BASE_PATH ?? ''
            const pathIncludesBasePath = path === basePath || path.startsWith(`${basePath}/`)
            if (href.startsWith('/') || pathIncludesBasePath) {
              // If the link is a root-relative URL or an absolute but internal URL, ensure it is relative to the base path
              href = (pathIncludesBasePath ? path.substring(basePath.length) : path) || '/'
              // Also ensure the link includes a locale
              const { locale: pathLocale, pathWithoutLocale } = extractLocaleFromPath(href, supportedLocales)
              href = `/${pathLocale ?? locale ?? defaultLocale}${pathWithoutLocale}`
            } else if (process.env.ORIGIN && rootRelativeOrTheGraphUrlRegex.test(process.env.ORIGIN)) {
              // If the link is an absolute URL under (staging.)thegraph.com, ensure we don't switch between staging and production
              href = `${process.env.ORIGIN}${path}`
            }
          } else if (absoluteUrlRegex.test(href)) {
            // If the link is an external URL, default the target to `_blank`
            target ??= '_blank'
          }

          return { ...props, href, target }
        }}
        // TODO: Remove when we stop using components that require Theme UI
        useThemeUI
      >
        <I18nProvider supportedLocales={supportedLocales} translations={translations}>
          <AnalyticsProvider
            app="DOCS"
            mixpanel={{
              sdk: mixpanel,
              token: process.env.MIXPANEL_TOKEN ?? null,
            }}
            googleAnalytics={{
              sdk: googleAnalytics,
              measurementId: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID ?? null,
            }}
          >
            <CookieBanner />
            <Component {...pageProps} />
          </AnalyticsProvider>
        </I18nProvider>
      </GDSProvider>
    </>
  )
}
