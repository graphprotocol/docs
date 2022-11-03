import { AppLocale, translations } from '@/i18n'

import { NavItemDefinition } from './types'

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
        slug: 'benefits',
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
        slug: 'developing',
      },
      {
        slug: 'explorer',
      },
    ],
  },
  {
    slug: 'billing',
  },
  {
    slug: 'network-transition-faq',
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
        slug: 'querying-best-practices',
      },
      {
        slug: 'querying-from-an-application',
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
      {
        slug: 'grafting',
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
