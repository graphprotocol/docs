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
  },
  {
    title: {
      en: 'Publishing subgraphs',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]'
    },
    slug: 'publishing-subgraphs',
    children: [
      {
        slug: 'publishing'
      },
      {
        slug: 'managing'
      }
    ]
  },
  {
    title: {
      en: 'Querying subgraphs',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]'
    },
    slug: 'querying-subgraphs',
    children: [
      {
        slug: 'query-the-graph'
      },
      {
        slug: 'graphql-api'
      },
      {
        slug: 'billing-and-api-keys'
      },
      {
        slug: 'distributed-systems'
      }
    ]
  },
  {
    title: {
      en: 'Cookbook',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]'
    },
    slug: 'cookbook',
    children: [
      {
        slug: 'quick-start'
      },
      {
        slug: 'assemblyscript-migration-guide'
      },
      {
        slug: 'querying-from-your-app'
      },
      {
        slug: 'near'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: {
      en: 'The Graph Network',
      ar: '[TODO: Translate]',
      ko: '[TODO: Translate]',
      zh: '[TODO: Translate]',
      ja: '[TODO: Translate]',
      es: '[TODO: Translate]'
    },
    slug: 'network',
    children: [
      {
        slug: 'overview'
      },
      {
        slug: 'protocol-economics'
      },
      {
        slug: 'network-components'
      },
      {
        slug: 'indexing'
      },
      {
        slug: 'curating'
      },
      {
        slug: 'delegating'
      },
      {
        slug: 'explorer'
      }
    ]
  },
  {
    divider: true
  },
  {
    slug: 'community-resources'
  }
]
