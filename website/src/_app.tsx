import { DocSearch } from '@graphprotocol/nextra-theme'
import mixpanel from 'mixpanel-browser'
import type { AppProps } from 'next/app'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import type { PropsWithChildren } from 'react'
import googleAnalytics from 'react-ga4'

import {
  AnalyticsProvider,
  type ButtonOrLinkProps,
  defaultLocale,
  ExperimentalLocaleSwitcher,
  extractLocaleFromPath,
  extractLocaleFromRouter,
  GDSProvider,
  I18nProvider,
  Layout as GDSLayout,
  Link,
  type NestedStrings,
} from '@edgeandnode/gds'
import { CookieBanner, GlobalFooter, MarketingNavbar } from '@edgeandnode/go'

import { supportedLocales, translations, useI18n } from '@/i18n'

import '@edgeandnode/gds/style.css'
import '@docsearch/css'

// Match either:
// 1. URLs that start with `/` followed by an optional path or query (root-relative URLs)
// 2. URLs that start with `http(s)://(www.|staging.)thegraph.com`, followed by an optional path/query
const rootRelativeOrTheGraphUrlRegex =
  /^(?:\/(?!\/)|(?:(?:https?:)?\/\/(?:(?:www|staging)\.)?thegraph\.com)(?:$|\/|\?))(.+)?/i

// Match URLs that start with a protocol/scheme or `//`
const absoluteUrlRegex = /^(?:[a-zA-Z][a-zA-Z\d+.-]*:|\/\/)/

const removeBasePathFromUrl = (url: string) => url.substring((process.env.BASE_PATH ?? '').length)

const DocSearchHit = ({ hit, children }: PropsWithChildren<{ hit: { url: string } }>) => (
  <Link.Unstyled href={removeBasePathFromUrl(hit.url)}>{children}</Link.Unstyled>
)

function MyApp({ Component, router, pageProps }: AppProps) {
  const hideLocaleSwitcher = pageProps.hideLocaleSwitcher ?? false
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
              href = pathIncludesBasePath ? path.substring(basePath.length) : path
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
            <Layout showLocaleSwitcher={!hideLocaleSwitcher}>
              <Component {...pageProps} />
            </Layout>
          </AnalyticsProvider>
        </I18nProvider>
      </GDSProvider>
    </>
  )
}

function Layout({ showLocaleSwitcher, children }: PropsWithChildren<{ showLocaleSwitcher: boolean }>) {
  const router = useRouter()
  const { t, translations, locale } = useI18n()

  return (
    <>
      <div sx={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}>
        <div
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            minHeight: '768px',
            backgroundImage: `url('${process.env.BASE_PATH ?? ''}/img/page-background.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            '@media (min-width: 1440px)': {
              aspectRatio: '1440/768',
            },
          }}
        />
      </div>
      <GDSLayout
        header={
          <MarketingNavbar
            children={(defaultChildren) => (
              <>
                {defaultChildren}
                {showLocaleSwitcher ? <ExperimentalLocaleSwitcher className="sm:hidden" /> : null}
              </>
            )}
            contentAfter={(defaultContentAfter) => (
              <>
                <DocSearch
                  apiKey={process.env.ALGOLIA_API_KEY ?? ''}
                  appId={process.env.ALGOLIA_APP_ID ?? ''}
                  indexName="thegraph-docs"
                  searchParameters={{
                    facetFilters: [`language:${locale}`],
                  }}
                  disableUserPersonalization={true}
                  transformItems={(items: any) =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    items.map((item: any) => ({
                      ...item,
                      url: item.url.replace('https://thegraph.com/docs', process.env.BASE_PATH ?? ''),
                    }))
                  }
                  hitComponent={DocSearchHit}
                  navigator={{
                    navigate({ itemUrl }: { itemUrl: string }) {
                      void router.push(removeBasePathFromUrl(itemUrl))
                    },
                    navigateNewTab({ itemUrl }: { itemUrl: string }) {
                      const windowReference = window.open(itemUrl, '_blank', 'noopener')
                      if (windowReference) {
                        windowReference.focus()
                      }
                    },
                    navigateNewWindow({ itemUrl }: { itemUrl: string }) {
                      window.open(itemUrl, '_blank', 'noopener')
                    },
                  }}
                  translations={translations.docsearch as NestedStrings}
                  placeholder={t('docsearch.button.buttonText')}
                />
                {showLocaleSwitcher ? (
                  <ExperimentalLocaleSwitcher className="prop-display-format-short max-sm:hidden xl:prop-display-format-full" />
                ) : null}
                {defaultContentAfter}
              </>
            )}
          />
        }
        headerSticky
        footer={<GlobalFooter showLogo={true} showLocaleSwitcher={showLocaleSwitcher} />}
      >
        <CookieBanner />
        {children}
      </GDSLayout>
    </>
  )
}

export default MyApp
