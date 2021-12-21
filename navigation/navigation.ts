import { NavItemDefinition } from './types'

export const navigation: NavItemDefinition[] = [
  {
    slug: ''
  },
  {
    title: {
      en: 'About The Graph',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]'
    },
    slug: 'about',
    children: [
      {
        slug: 'introduction'
      },
      {
        slug: 'faqs'
      },
      {
        slug: 'glossary'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: {
      en: 'Developing subgraphs',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]'
    },
    slug: 'developing-subgraphs',
    children: [
      {
        slug: 'getting-started'
      },
      {
        slug: 'manifest'
      },
      {
        slug: 'schema'
      },
      {
        slug: 'assemblyscript-api'
      },
      {
        slug: 'unit-testing'
      },
      {
        slug: 'graph-cli'
      },
      {
        slug: 'faqs'
      }
    ]
  },
  {
    title: {
      en: 'Deploying subgraphs',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]'
    },
    slug: 'deploying-subgraphs',
    children: [
      {
        slug: 'studio'
      },
      {
        slug: 'hosted-service'
      },
      {
        slug: 'local-graph-node'
      },
      {
        slug: 'syncing'
      }
    ]
  }
]
