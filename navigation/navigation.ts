import { NavItemDefinition } from './types'


export const navigation: NavItemDefinition[] = [
  {
    slug: '',
  },
  {
    title: {
      en: 'About The Graph',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]',
    },
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
    title: {
      en: 'Developer',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]',
    },
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
        slug: 'studio-faq',
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
    title: {
      en: 'Supported Networks',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]',
    },
    slug: 'supported-networks',
    children: [
      {
        slug: 'near',
      },
    ],
  },
]
