import { NavItemDefinition } from './types'
import { AppLocale, translations } from '@/i18n'

export const navigation = (locale: AppLocale): NavItemDefinition[] => [
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
    title: translations[locale].global.navigation.theGraphNetwork,
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
    heading: translations[locale].global.navigation.subgraphs,
  },
  {
    title: translations[locale].global.navigation.developing,
    slug: 'developing',
    children: [
      {
        slug: 'supported-networks',
      },
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
    title: translations[locale].global.navigation.deploying,
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
    title: translations[locale].global.navigation.publishing,
    slug: 'publishing',
    children: [
      {
        slug: 'publishing-a-subgraph',
      },
    ],
  },
  {
    title: translations[locale].global.navigation.managing,
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
    title: translations[locale].global.navigation.querying,
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
    title: translations[locale].global.navigation.cookbook,
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
    title: translations[locale].global.navigation.releaseNotes,
    slug: 'release-notes',
    children: [
      {
        slug: 'assemblyscript-migration-guide',
      },
    ],
  },
]
