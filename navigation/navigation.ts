import { NavItemDefinition } from './types'
import { AppLocale, translations } from '@/i18n'

export const navigation: (locale: AppLocale) => NavItemDefinition[] = (locale) => [
  {
    slug: '',
  },
  {
    divider: true,
  },
  {
    slug: 'about',
  },
  {
    title: 'Network', // TODO: Translate
    slug: 'network',
    children: [
      {
        slug: 'overview',
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
        slug: 'explorer',
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: 'Developing subgraphs', // TODO: Translate
    slug: 'developing',
    children: [
      {
        slug: 'define-subgraph-hosted',
      },
      {
        slug: 'create-subgraph-hosted',
      },
      {
        slug: 'assemblyscript-api',
      },
      {
        slug: 'matchstick',
      },
      {
        slug: 'developer-faq',
      },
    ],
  },
  {
    title: 'Deploying subgraphs', // TODO: Translate
    slug: 'deploying',
    children: [
      {
        slug: 'subgraph-studio',
      },
      {
        slug: 'deploy-subgraph-studio',
      },
      {
        slug: 'studio-faq',
      },
      {
        slug: 'what-is-hosted-service',
      },
      {
        slug: 'deploy-subgraph-hosted',
      },
    ],
  },
  {
    title: 'Publishing subgraphs', // TODO: Translate
    slug: 'publishing',
    children: [
      {
        slug: 'publish-subgraph',
      },
    ],
  },
  {
    title: 'Managing subgraphs', // TODO: Translate
    slug: 'managing',
    children: [
      {
        slug: 'transferring-subgraph-ownership',
      },
      {
        slug: 'deprecating-a-subgraph',
      },
    ],
  },
  {
    title: 'Querying subgraphs', // TODO: Translate
    slug: 'querying',
    children: [
      {
        slug: 'query-the-graph',
      },
      {
        slug: 'managing-api-keys',
      },
      {
        slug: 'querying-from-your-app',
      },
      {
        slug: 'querying-best-practices',
      },
      {
        slug: 'distributed-systems',
      },
      {
        slug: 'graphql-api',
      },
      {
        slug: 'query-hosted-service',
      },
      {
        slug: 'billing',
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: 'Cookbook', // TODO: Translate
    slug: 'cookbook',
    children: [
      {
        slug: 'quick-start',
      },
      {
        slug: 'migrating-subgraph',
      },
      {
        slug: 'multisig',
      },
      {
        slug: 'subgraph-debug-forking',
      },
      {
        slug: 'near',
      },
      {
        slug: 'cosmos',
      },
      {
        slug: 'arweave',
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: 'Release Notes & Upgrade Guides', // TODO: Translate
    slug: 'release-notes',
    children: [
      {
        slug: 'assemblyscript-migration-guide',
      },
    ],
  },
]
