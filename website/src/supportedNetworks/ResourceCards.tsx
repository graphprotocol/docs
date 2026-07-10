import { GraphExplorer, MoneyWavy, Subgraph, Substreams } from '@edgeandnode/gds/icons'

type Resource = {
  href: string
  titleKey: string
  descriptionKey: string
  minutes: number
  icon?: React.ReactNode
}

export const evmCards = [
  {
    href: 'https://thegraph.com/docs/en/subgraphs/quick-start/',
    titleKey: 'index.networkGuides.evm.subgraphQuickStart.title' as const,
    descriptionKey: 'index.networkGuides.evm.subgraphQuickStart.description' as const,
    minutes: 10,
    icon: <Subgraph size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/substreams/quick-start/',
    titleKey: 'index.networkGuides.evm.substreamsQuickStart.title' as const,
    descriptionKey: 'index.networkGuides.evm.substreamsQuickStart.description' as const,
    minutes: 15,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/providers/subgraph-studio/introduction/',
    titleKey: 'index.networkGuides.evm.billing.title' as const,
    descriptionKey: 'index.networkGuides.evm.billing.description' as const,
    minutes: 5,
    icon: <Substreams size={6} />, // TODO: Is this really the right icon for this?
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/existing-subgraphs/explorer/',
    titleKey: 'index.networkGuides.evm.graphExplorer.title' as const,
    descriptionKey: 'index.networkGuides.evm.graphExplorer.description' as const,
    minutes: 12,
  },
  {
    href: 'https://substreams.dev/',
    titleKey: 'index.networkGuides.evm.substreamsDev.title' as const,
    descriptionKey: 'index.networkGuides.evm.substreamsDev.description' as const,
    minutes: 5,
  },
]

export const evmSubgraphsOnlyCards = [
  {
    href: 'https://thegraph.com/docs/en/subgraphs/quick-start/',
    titleKey: 'index.networkGuides.evm.subgraphQuickStart.title' as const,
    descriptionKey: 'index.networkGuides.evm.subgraphQuickStart.description' as const,
    minutes: 10,
    icon: <Subgraph size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/existing-subgraphs/explorer/',
    titleKey: 'index.networkGuides.evm.graphExplorer.title' as const,
    descriptionKey: 'index.networkGuides.evm.graphExplorer.description' as const,
    minutes: 12,
    icon: <GraphExplorer size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/providers/subgraph-studio/introduction/',
    titleKey: 'index.networkGuides.evm.billing.title' as const,
    descriptionKey: 'index.networkGuides.evm.billing.description' as const,
    minutes: 5,
    icon: <MoneyWavy alt="Money" size={6} />,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/best-practices/timeseries/',
    titleKey: 'index.networkGuides.evm.timeseries.title' as const,
    descriptionKey: 'index.networkGuides.evm.timeseries.description' as const,
    minutes: 5,
  },
  {
    href: 'https://thegraph.com/docs/en/subgraphs/developing/creating/advanced/',
    titleKey: 'index.networkGuides.evm.advancedFeatures.title' as const,
    descriptionKey: 'index.networkGuides.evm.advancedFeatures.description' as const,
    minutes: 7,
  },
]

export const nonEvmCards = [
  {
    href: 'https://thegraph.com/docs/en/substreams/quick-start/',
    titleKey: 'index.networkGuides.evm.substreamsQuickStart.title' as const,
    descriptionKey: 'index.networkGuides.evm.substreamsQuickStart.description' as const,
    minutes: 15,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://substreams.dev/',
    titleKey: 'index.networkGuides.nonEvm.substreamsDev.title' as const,
    descriptionKey: 'index.networkGuides.nonEvm.substreamsDev.description' as const,
    minutes: 10,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://docs.substreams.dev/how-to-guides/sinks',
    titleKey: 'index.networkGuides.nonEvm.customSubstreamsSinks.title' as const,
    descriptionKey: 'index.networkGuides.nonEvm.customSubstreamsSinks.description' as const,
    minutes: 8,
    icon: <Substreams size={6} />,
  },
  {
    href: 'https://github.com/streamingfast/substreams-starter',
    titleKey: 'index.networkGuides.nonEvm.substreamsStarter.title' as const,
    descriptionKey: 'index.networkGuides.nonEvm.substreamsStarter.description' as const,
    minutes: 5,
  },
  {
    href: 'https://github.com/streamingfast/substreams',
    titleKey: 'index.networkGuides.nonEvm.substreamsRepo.title' as const,
    descriptionKey: 'index.networkGuides.nonEvm.substreamsRepo.description' as const,
    minutes: 7,
  },
]
