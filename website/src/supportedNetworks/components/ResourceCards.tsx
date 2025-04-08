import {
  APIToken,
  GraphExplorer,
  MoneyWavy,
  Subgraph,
  Substreams,
  SubstreamsPoweredSubgraph,
} from '@edgeandnode/gds/icons'

type Resource = {
  href: string
  titleKey: string
  descriptionKey: string
  minutes: number
  icon?: React.ReactNode
}

// EVM + Subgraphs, Substreams and Token API
export const evmWithTokenAPICards: Resource[] = [
  {
    href: 'https://thegraph.com/docs/en/subgraphs/quick-start/',
    titleKey: 'index.networkGuides.evm.subgraphQuickStart.title',
    descriptionKey: 'index.networkGuides.evm.subgraphQuickStart.description',
    minutes: 10,
    icon: <Subgraph size={6} />,
  },
  {
    href: 'https://docs.substreams.dev/',
    titleKey: 'index.networkGuides.evm.substreamsQuickStart.title',
    descriptionKey: 'index.networkGuides.evm.substreamsQuickStart.description',
    minutes: 15,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/token-api/quick-start/',
    titleKey: 'index.networkGuides.evm.tokenapi.title',
    descriptionKey: 'index.networkGuides.evm.tokenapi.description',
    minutes: 8,
    icon: <APIToken size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/explorer/',
    titleKey: 'index.networkGuides.evm.graphExplorer.title',
    descriptionKey: 'index.networkGuides.evm.graphExplorer.description',
    minutes: 12,
  },
  {
    href: 'https://substreams.dev/',
    titleKey: 'index.networkGuides.evm.substreamsDev.title',
    descriptionKey: 'index.networkGuides.evm.substreamsDev.description',
    minutes: 5,
  },
]

// EVM without Token API
export const evmNoTokenAPICards: Resource[] = [
  {
    href: 'https://thegraph.com/docs/en/subgraphs/quick-start/',
    titleKey: 'index.networkGuides.evm.subgraphQuickStart.title',
    descriptionKey: 'index.networkGuides.evm.subgraphQuickStart.description',
    minutes: 10,
    icon: <Subgraph size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/substreams/quick-start/',
    titleKey: 'index.networkGuides.evm.substreamsQuickStart.title',
    descriptionKey: 'index.networkGuides.evm.substreamsQuickStart.description',
    minutes: 15,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/billing/',
    titleKey: 'index.networkGuides.evm.billing.title',
    descriptionKey: 'index.networkGuides.evm.billing.description',
    minutes: 5,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/explorer/',
    titleKey: 'index.networkGuides.evm.graphExplorer.title',
    descriptionKey: 'index.networkGuides.evm.graphExplorer.description',
    minutes: 12,
  },
  {
    href: 'https://substreams.dev/',
    titleKey: 'index.networkGuides.evm.substreamsDev.title',
    descriptionKey: 'index.networkGuides.evm.substreamsDev.description',
    minutes: 5,
  },
]

// EVM only Subgraphs
export const evmSubgraphsOnlyCards: Resource[] = [
  {
    href: 'https://thegraph.com/docs/en/subgraphs/quick-start/',
    titleKey: 'index.networkGuides.evm.subgraphQuickStart.title',
    descriptionKey: 'index.networkGuides.evm.subgraphQuickStart.description',
    minutes: 10,
    icon: <Subgraph size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/explorer/',
    titleKey: 'index.networkGuides.evm.graphExplorer.title',
    descriptionKey: 'index.networkGuides.evm.graphExplorer.description',
    minutes: 12,
    icon: <GraphExplorer size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/billing/',
    titleKey: 'index.networkGuides.evm.billing.title',
    descriptionKey: 'index.networkGuides.evm.billing.description',
    minutes: 5,
    icon: <MoneyWavy alt="Money" size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/best-practices/timeseries/',
    titleKey: 'index.networkGuides.evm.timeseries.title',
    descriptionKey: 'index.networkGuides.evm.timeseries.description',
    minutes: 5,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/developing/creating/advanced/',
    titleKey: 'index.networkGuides.evm.advancedFeatures.title',
    descriptionKey: 'index.networkGuides.evm.advancedFeatures.description',
    minutes: 7,
  },
]

// Non-EVM + Token API
export const nonEvmWithTokenAPICards: Resource[] = [
  {
    href: 'https://docs.substreams.dev/',
    titleKey: 'index.networkGuides.nonEvm.officialDocs.title',
    descriptionKey: 'index.networkGuides.nonEvm.officialDocs.description',
    minutes: 15,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/sps/introduction/',
    titleKey: 'index.networkGuides.nonEvm.spsIntro.title',
    descriptionKey: 'index.networkGuides.nonEvm.spsIntro.description',
    minutes: 8,
    icon: <SubstreamsPoweredSubgraph size={6} />,
  },
  {
    href: 'https://substreams.dev/',
    titleKey: 'index.networkGuides.nonEvm.substreamsDev.title',
    descriptionKey: 'index.networkGuides.nonEvm.substreamsDev.description',
    minutes: 10,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://github.com/streamingfast/substreams-starter',
    titleKey: 'index.networkGuides.nonEvm.substreamsStarter.title',
    descriptionKey: 'index.networkGuides.nonEvm.substreamsStarter.description',
    minutes: 5,
  },
  {
    href: 'https://github.com/streamingfast/substreams',
    titleKey: 'index.networkGuides.nonEvm.substreamsRepo.title',
    descriptionKey: 'index.networkGuides.nonEvm.substreamsRepo.description',
    minutes: 7,
  },
]

// Non-EVM without Token API
export const nonEvmNoTokenAPICards: Resource[] = [
  {
    href: 'https://thegraph.com/docs/en/substreams/quick-start/',
    titleKey: 'index.networkGuides.evm.substreamsQuickStart.title',
    descriptionKey: 'index.networkGuides.evm.substreamsQuickStart.description',
    minutes: 15,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://substreams.dev/',
    titleKey: 'index.networkGuides.nonEvm.substreamsDev.title',
    descriptionKey: 'index.networkGuides.nonEvm.substreamsDev.description',
    minutes: 10,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://docs.substreams.dev/how-to-guides/sinks',
    titleKey: 'index.networkGuides.nonEvm.customSubstreamsSinks.title',
    descriptionKey: 'index.networkGuides.nonEvm.customSubstreamsSinks.description',
    minutes: 8,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://github.com/streamingfast/substreams-starter',
    titleKey: 'index.networkGuides.nonEvm.substreamsStarter.title',
    descriptionKey: 'index.networkGuides.nonEvm.substreamsStarter.description',
    minutes: 5,
  },
  {
    href: 'https://github.com/streamingfast/substreams',
    titleKey: 'index.networkGuides.nonEvm.substreamsRepo.title',
    descriptionKey: 'index.networkGuides.nonEvm.substreamsRepo.description',
    minutes: 7,
  },
]
