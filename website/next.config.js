import nextra from 'nextra'

const env = {
  BASE_PATH: process.env.NODE_ENV === 'production' ? '/docs' : '',
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  MIXPANEL_TOKEN:
    process.env.NODE_ENV === 'production'
      ? process.env.ENVIRONMENT === 'production'
        ? 'cfeac8baf33c9b4d255f28d57f3c9148' // production
        : 'e57a9892339b2acfd02943c86b746d32' // staging
      : null, // local dev (no tracking)
}

const withNextra = nextra({
  theme: '@graphprotocol/nextra-theme',
  staticImage: true,
  flexsearch: false,
  codeHighlight: false,
  defaultShowCopyCode: false,
  transform(result, { route }) {
    if (route && !result.includes('getStaticProps')) {
      const banner = `
import { getPageMap } from '@/src/getPageMap'

export const getStaticProps = async context => ({
  props: {
    __nextra_pageMap: await getPageMap('${route.split('/')[1]}')
  }
})`
      result += banner
    }

    return result
  },
})

export default withNextra({
  experimental: {
    // Fix scroll restoration (see https://github.com/vercel/next.js/issues/37893#issuecomment-1221335543)
    scrollRestoration: true,
  },
  env,
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
      source: '/en/firehose/',
      destination: '/en/firehose/README/',
      permanent: false,
    },
    {
      source: '/en/querying/graph-client/',
      destination: '/en/querying/graph-client/README/',
      permanent: false,
    },
    {
      source: '/en/substreams/',
      destination: '/en/substreams/README/',
      permanent: false,
    },
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    unoptimized: true,
  },
})
