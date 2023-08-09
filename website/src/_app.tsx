import mixpanel from 'mixpanel-browser'
import { AppProps } from 'next/app'
import NextLink from 'next/link'
import { DefaultSeo } from 'next-seo'

import {
  AnalyticsProvider,
  ButtonOrLinkProps,
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

const internalAbsoluteHrefRegex = /^(((https?:)?\/\/((www|staging)\.)?thegraph\.com)?\/docs\/|\/(?=[^/]))/
const externalHrefRegex = /^([a-zA-Z0-9+.-]+:)?\/\//

function MyAppWithLocale({ Component, pageProps, router }: AppProps) {
  const hideLocaleSwitcher = pageProps.hideLocaleSwitcher ?? false
  const localeSwitcher = hideLocaleSwitcher ? null : <LocaleSwitcher key="localeSwitcher" />
  const { locale, extractLocaleFromPath } = useI18n()

  return (
    <>
      <DefaultSeo
        title="Docs | The Graph"
        description="Browse the latest developer documentation including API reference, articles, and sample code"
        openGraph={{
          type: 'website',
          locale,
          url: 'https://thegraph.com/',
          siteName: 'The Graph',
          images: [
            {
              url: 'https://storage.googleapis.com/graph-website/seo/graph-website.jpg',
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
        clientLink={NextLink}
        mapButtonOrLinkProps={<T extends ButtonOrLinkProps>(props: T) => {
          let href = typeof props.href === 'object' ? props.href.href : props.href

          // Don't do anything if it's not a link, or if it's a link to an anchor on the same page
          if (!props.href || !href || href.startsWith('#')) {
            return props
          }

          let target = props.target

          // If the link is internal and absolute, ensure `href` is relative to the base path (i.e. starts with `/`,
          // not `/docs/` or `https://...`) and includes a locale (by prepending the current locale if there is none)
          const internalAbsoluteHrefMatches = internalAbsoluteHrefRegex.exec(href)
          if (internalAbsoluteHrefMatches) {
            href = href.substring(internalAbsoluteHrefMatches[0].length - 1)
            const { locale: pathLocale, pathWithoutLocale } = extractLocaleFromPath(href)
            href = `/${pathLocale ?? locale}${pathWithoutLocale}`
          }

          // If the link is external, default the target to `_blank`
          if (externalHrefRegex.test(href)) {
            target = target ?? '_blank'
          }

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
