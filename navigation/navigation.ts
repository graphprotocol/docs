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
    title: 'Developing Subgraphs', // TODO: Translate
    slug: 'developing',
    children: [
      {
        slug: 'defining-a-subgraph',
      },
      {
        slug: 'creating-a-subgraph',
      },
      {
        slug: 'assemblyscript-api',
      },
      {
        slug: 'unit-testing-framework',
      },
      {
        slug: 'developer-faqs',
      },
    ],
  },
  {
    title: 'Deploying Subgraphs', // TODO: Translate
    slug: 'deploying',
    children: [
      {
        slug: 'subgraph-studio',
      },
      {
        slug: 'deploying-a-subgraph-to-studio',
      },
      {
        slug: 'subgraph-studio-faqs',
      },
      {
        slug: 'hosted-service',
      },
      {
        slug: 'deploying-a-subgraph-to-hosted',
      },
    ],
  },
  {
    title: 'Publishing Subgraphs', // TODO: Translate
    slug: 'publishing',
    children: [
      {
        slug: 'publishing-a-subgraph',
      },
    ],
  },
  {
    title: 'Managing Subgraphs', // TODO: Translate
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
    title: 'Querying Subgraphs', // TODO: Translate
    slug: 'querying',
    children: [
      {
        slug: 'querying-the-graph',
      },
      {
        slug: 'managing-api-keys',
      },
      {
        slug: 'querying-from-an-application',
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
        slug: 'querying-the-hosted-service',
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
        slug: 'migrating-a-subgraph',
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
