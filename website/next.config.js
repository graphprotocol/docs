import nextra from 'nextra'

import { defaultLocale, translate } from '@edgeandnode/gds'

// Compile `i18n.ts` to `i18n.js` since we can't import `ts` files in `next.config.js`
import { translations } from './dist/i18n.js'
import { remarkTransformRemoteGitHub } from './src/remarkTransformRemoteGitHub.js'

const env = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  ORIGIN: process.env.ORIGIN,
  BASE_PATH: process.env.BASE_PATH,
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  MIXPANEL_TOKEN:
    process.env.NODE_ENV === 'production'
      ? process.env.ENVIRONMENT === 'production'
        ? 'cfeac8baf33c9b4d255f28d57f3c9148' // production
        : 'e57a9892339b2acfd02943c86b746d32' // staging
      : '', // local dev (no tracking)
  GOOGLE_ANALYTICS_MEASUREMENT_ID: process.env.NODE_ENV === 'production' ? 'G-5MK48LFNKY' : '',
}

const withNextra = nextra({
  theme: './src/NextraLayout.tsx',
  search: false,
  codeHighlight: false,
  defaultShowCopyCode: false,
  readingTime: true,
  transformPageMap(pageMap) {
    const route = pageMap[0]?.route
    const locale = typeof route === 'string' ? route.slice(1, 3) : defaultLocale
    const t = (key) => translate(translations, locale, `global.sidebar.${key}`)

    const metaFile = {
      '---0': {
        type: 'separator',
        title: 'Introduction',
      },
      index: t('index'),
      about: '',
      network: t('network'),
      sunrise: '',
      billing: '',
      glossary: '',
      tokenomics: '',
      arbitrum: t('arbitrum'),
      '---1': {
        type: 'separator',
        title: t('subgraphs'),
      },
      'quick-start': '',
      developing: t('developing'),
      deploying: t('deploying'),
      publishing: t('publishing'),
      managing: t('managing'),
      querying: t('querying'),
      cookbook: t('cookbook'),
      'release-notes': t('releaseNotes'),
      '---2': {
        type: 'separator',
        title: t('substreams'),
      },
      substreams: '',
      '---3': {
        type: 'separator',
        title: t('indexing'),
      },
      'operating-graph-node': '',
      'chain-integration-overview': '',
      'supported-network-requirements': '',
      'new-chain-integration': '',
      firehose: '',
      graphcast: '',
      'mips-faqs': '',
    }

    return [
      { data: metaFile },
      {
        route: `/${locale}`,
        name: 'index',
        frontMatter: {},
      },
      ...pageMap,
    ]
  },
  mdxOptions: {
    remarkPlugins: [remarkTransformRemoteGitHub],
  },
})

/** @type {import('next').NextConfig} */
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
  i18n: {
    defaultLocale,
    locales: Object.keys(translations),
  },
})
