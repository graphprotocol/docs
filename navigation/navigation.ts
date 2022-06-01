import { NavItemDefinition } from './types'
import { AppLocale, translations } from '@/i18n'

export const navigation: (locale: AppLocale) => NavItemDefinition[] = (locale) => [
  {
    slug: '',
  },
  {
    title: translations[locale].global.aboutTheGraph,
    slug: 'about',
    children: [
      {
        slug: 'introduction',
      },
      {
        slug: 'network',
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: translations[locale].global.developer,
    slug: 'developer',
    children: [
      {
        slug: 'quick-start',
      },
      {
        slug: 'define-subgraph-hosted',
      },
      {
        slug: 'create-subgraph-hosted',
      },
      {
        slug: 'publish-subgraph',
      },
      {
        slug: 'query-the-graph',
      },
      {
        slug: 'querying-from-your-app',
      },
      {
        slug: 'distributed-systems',
      },
      {
        slug: 'assemblyscript-api',
      },
      {
        slug: 'assemblyscript-migration-guide',
      },
      {
        slug: 'graphql-api',
      },
      {
        slug: 'matchstick',
      },
      {
        slug: 'subgraph-debug-forking',
      },
      {
        slug: 'deprecating-a-subgraph',
      },
      {
        slug: 'developer-faq',
      },
    ],
  },
  {
    slug: 'indexing',
  },
  {
    slug: 'delegating',
  },
  {
    slug: 'curating',
  },
  {
    divider: true,
  },
  {
    title: 'Subgraph Studio',
    slug: 'studio',
    children: [
      {
        slug: 'subgraph-studio',
      },
      {
        slug: 'deploy-subgraph-studio',
      },
      {
        slug: 'billing',
      },
      {
        slug: 'managing-api-keys'
      },
      {
        slug: 'studio-faq',
      },
      {
        slug: 'transferring-subgraph-ownership',
      },
    ],
  },
  {
    slug: 'explorer',
  },
  {
    title: 'Hosted Service',
    slug: 'hosted-service',
    children: [
      {
        slug: 'what-is-hosted-service',
      },
      {
        slug: 'deploy-subgraph-hosted',
      },
      {
        slug: 'query-hosted-service',
      },
      {
        slug: 'migrating-subgraph',
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: translations[locale].global.supportedNetworks,
    slug: 'supported-networks',
    children: [
      {
        slug: 'near',
      },
      {
        slug: 'arweave',
      },
    ],
  },
]
