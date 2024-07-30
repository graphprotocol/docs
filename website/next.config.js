import nextra from 'nextra'
import path from 'node:path'
import { visit } from 'unist-util-visit'

import { translate } from '@edgeandnode/gds'

// Compile `i18n.ts` to `i18n.js` since we can't import `ts` files in `next.config.js`
import { translations } from './dist/i18n.js'
import { remarkReplaceLinks } from './src/remarkReplaceLinks.js'

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
  GOOGLE_ANALYTICS_MEASUREMENT_ID: process.env.NODE_ENV === 'production' ? 'G-5MK48LFNKY' : '',
}

const withNextra = nextra({
  theme: './src/nextra-theme/index.tsx',
  search: false,
  codeHighlight: false,
  defaultShowCopyCode: false,
  readingTime: true,
  transformPageMap(pageMap) {
    const locale = pageMap[0].route.slice(0, 2)
    // translate(translations, locale, 'sidebar.')
    return [
      {
        index: '',
        '---1': {
          type: 'separator',
        },
        about: '',
        network: 'The Graph Network',
        sunrise: '',
        billing: '',
        glossary: '',
        tokenomics: '',
        arbitrum: 'Scaling with Arbitrum',
        '---2': {
          type: 'separator',
        },
        '###1': {
          type: 'heading',
          title: 'Subgraphs',
        },
        'quick-start': '',
        developing: 'Developing',
        deploying: 'Deploying',
        publishing: 'Publishing',
        managing: 'Managing',
        querying: 'Querying',
        cookbook: 'Cookbook',
        'release-notes': 'Release Notes & Upgrade Guides',
        '---3': {
          type: 'separator',
        },
        '###2': {
          type: 'heading',
          title: 'Substreams',
        },
        substreams: '',
        '---4': {
          type: 'separator',
        },
        '###3': {
          type: 'heading',
          title: 'Indexing',
        },
        'operating-graph-node': '',
        'chain-integration-overview': '',
        'supported-network-requirements': '',
        'new-chain-integration': '',
        firehose: '',
        graphcast: '',
        'mips-faqs': '',
      },
      ...pageMap,
      {
        route: `/${locale}`,
        name: 'index',
        frontMatter: {
          sidebarTitle: translate(translations, locale, 'index.title'),
        },
      },
    ]
  },
  mdxOptions: {
    remarkPlugins: [
      () => (tree, file) => {
        const filePath = path.relative(process.cwd(), file.history[0])
        const [fileName, directory] = filePath.split('/').reverse()

        let user
        let repo
        let branch
        let basePath
        if (directory === 'graph-ts') {
          user = 'graphprotocol'
          repo = 'graph-tooling'
          branch = 'main'
          basePath = '/developing/graph-ts/'
        } else if (directory === 'graph-client') {
          user = 'graphprotocol'
          repo = 'graph-client'
          branch = 'main'
          basePath = '/querying/graph-client/'
        }
        if (user) {
          visit(tree, 'link', (node) => {
            if (node.url.startsWith('../')) {
              const GO_BACK_REPEATED_REGEX = /(\.\.\/)+/
              node.url = node.url.replace(GO_BACK_REPEATED_REGEX, `https://github.com/${user}/${repo}/tree/${branch}/`)
            }
          })
          remarkReplaceLinks({ foundPath: fileName, basePath })(tree, file)
        }
      },
    ],
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
    defaultLocale: 'en',
    locales: [
      'ar',
      'de',
      'en',
      'es',
      'fr',
      'hi',
      'it',
      'ja',
      'ko',
      'mr',
      'nl',
      'pl',
      'pt',
      'ru',
      'sv',
      'tr',
      'uk',
      'ur',
      'vi',
      'zh',
      'cs',
      'ha',
      'ro',
      'yo',
    ],
  },
})
