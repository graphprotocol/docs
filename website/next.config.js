import nextra from 'nextra'

import { defaultLocale, extractLocaleFromPath } from '@edgeandnode/gds'

const env = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  BASE_PATH: process.env.NODE_ENV === 'production' ? '/docs' : '',
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  MIXPANEL_TOKEN:
    process.env.NODE_ENV === 'production'
      ? process.env.ENVIRONMENT === 'production'
        ? 'cfeac8baf33c9b4d255f28d57f3c9148' // production
        : 'e57a9892339b2acfd02943c86b746d32' // staging
      : '', // local dev (no tracking)
}

const withNextra = nextra({
  theme: '@graphprotocol/nextra-theme',
  staticImage: true,
  flexsearch: false,
  codeHighlight: false,
  defaultShowCopyCode: false,
  transform(result, { route }) {
    let { locale } = extractLocaleFromPath(route)
    locale = locale ?? defaultLocale

    result = `
      globalThis.__graph_docs_locale = '${locale}'
      ${result}
    `

    if (!result.includes('getStaticProps')) {
      result = `
        import { buildGetStaticProps } from '@/src/buildGetStaticProps'
        ${result}
        export const getStaticProps = buildGetStaticProps()
      `
    }

    return result
  },
})

export default withNextra({
  env,
  output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? '../out/docs' : undefined,
  experimental: {
    // Fix scroll restoration (see https://github.com/vercel/next.js/issues/37893#issuecomment-1221335543)
    scrollRestoration: true,
  },
  pageExtensions: ['tsx'],
  reactStrictMode: true,
  basePath: env.BASE_PATH,
  trailingSlash: true,
  redirects: () => [
    {
      source: '/',
      destination: '/en/',
      permanent: true,
    },
    {
      source: '/en/arbitrum-faq/',
      destination: '/en/arbitrum/arbitrum-faq/',
      permanent: true,
    },
    {
      source: '/en/querying/graph-client/',
      destination: '/en/querying/graph-client/README/',
      permanent: false,
    },
    {
      source: '/en/developing/graph-ts/',
      destination: '/en/developing/graph-ts/README/',
      permanent: false,
    },
    {
      source: '/en/developer/assemblyscript-api/',
      destination: '/en/developing/graph-ts/api/',
      permanent: true,
    },
    {
      source: '/en/developing/assemblyscript-api/',
      destination: '/en/developing/graph-ts/api/',
      permanent: true,
    },
  ],
  images: {
    unoptimized: true,
  },
})
