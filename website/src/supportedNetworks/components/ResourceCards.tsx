import {
  APIToken,
  GraphExplorer,
  MoneyWavy,
  Subgraph,
  Substreams,
  SubstreamsPoweredSubgraph,
} from '@edgeandnode/gds/icons'

import { Card, TimeIcon } from '@/components'
import { useI18n } from '@/i18n'

export type ResourceCard = {
  href: string
  titleKey: string
  descriptionKey: string
  minutes: number
  icon?: React.ReactNode
  className?: string
}

type CardSectionProps = {
  cards: ResourceCard[]
  gridCols: string
}

function CardSection({ cards, gridCols }: CardSectionProps) {
  const { t } = useI18n()

  return (
    <div className={`grid grid-cols-1 gap-4 ${gridCols}`}>
      {cards.map((card, index) => (
        <Card
          key={index}
          href={card.href}
          title={t(card.titleKey as any)}
          description={t(card.descriptionKey as any)}
          slotAboveTitle={<TimeIcon variant="reading" minutes={card.minutes} />}
          className={card.className ?? ''}
          icon={card.icon}
        />
      ))}
    </div>
  )
}

export function ResourceCardsLayout({
  topCards,
  bottomCards,
}: {
  topCards: ResourceCard[]
  bottomCards: ResourceCard[]
}) {
  return (
    <div className="graph-docs-not-markdown mt-8 grid grid-cols-1 gap-4">
      <CardSection cards={topCards} gridCols="sm:grid-cols-2 lg:grid-cols-3" />
      <CardSection cards={bottomCards} gridCols="sm:grid-cols-2" />
    </div>
  )
}

// EVM + Subgraphs, Substreams and Token API
export const evmWithTokenAPICards = {
  topCards: [
    {
      href: 'https://thegraph.com/docs/en/subgraphs/quick-start/',
      titleKey: 'index.networkGuides.evm.subgraphQuickStart.title',
      descriptionKey: 'index.networkGuides.evm.subgraphQuickStart.description',
      minutes: 10,
      icon: <Subgraph size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://docs.substreams.dev/',
      titleKey: 'index.networkGuides.evm.substreamsQuickStart.title',
      descriptionKey: 'index.networkGuides.evm.substreamsQuickStart.description',
      minutes: 15,
      icon: <Substreams size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://thegraph.com/docs/en/token-api/quick-start/',
      titleKey: 'index.networkGuides.evm.tokenapi.title',
      descriptionKey: 'index.networkGuides.evm.tokenapi.description',
      minutes: 8,
      icon: <APIToken size={6} />,
      className: 'min-h-64',
    },
  ],
  bottomCards: [
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
  ],
}

// EVM without Token API
export const evmNoTokenAPICards = {
  topCards: [
    {
      href: 'https://thegraph.com/docs/en/subgraphs/quick-start/',
      titleKey: 'index.networkGuides.evm.subgraphQuickStart.title',
      descriptionKey: 'index.networkGuides.evm.subgraphQuickStart.description',
      minutes: 10,
      icon: <Subgraph size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://thegraph.com/docs/en/substreams/quick-start/',
      titleKey: 'index.networkGuides.evm.substreamsQuickStart.title',
      descriptionKey: 'index.networkGuides.evm.substreamsQuickStart.description',
      minutes: 15,
      icon: <Substreams size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://thegraph.com/docs/en/subgraphs/billing/',
      titleKey: 'index.networkGuides.evm.billing.title',
      descriptionKey: 'index.networkGuides.evm.billing.description',
      minutes: 5,
      icon: <Substreams size={6} />,
      className: 'min-h-64',
    },
  ],
  bottomCards: [
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
  ],
}

// EVM only Subgraphs
export const evmSubgraphsOnlyCards = {
  topCards: [
    {
      href: 'https://thegraph.com/docs/en/subgraphs/quick-start/',
      titleKey: 'index.networkGuides.evm.subgraphQuickStart.title',
      descriptionKey: 'index.networkGuides.evm.subgraphQuickStart.description',
      minutes: 10,
      icon: <Subgraph size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://thegraph.com/docs/en/subgraphs/explorer/',
      titleKey: 'index.networkGuides.evm.graphExplorer.title',
      descriptionKey: 'index.networkGuides.evm.graphExplorer.description',
      minutes: 12,
      icon: <GraphExplorer size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://thegraph.com/docs/en/subgraphs/billing/',
      titleKey: 'index.networkGuides.evm.billing.title',
      descriptionKey: 'index.networkGuides.evm.billing.description',
      minutes: 5,
      icon: <MoneyWavy alt="Money" size={6} />,
      className: 'min-h-64',
    },
  ],
  bottomCards: [
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
  ],
}

// Non-EVM + Token API
export const nonEvmWithTokenAPICards = {
  topCards: [
    {
      href: 'https://docs.substreams.dev/',
      titleKey: 'index.networkGuides.nonEvm.officialDocs.title',
      descriptionKey: 'index.networkGuides.nonEvm.officialDocs.description',
      minutes: 15,
      icon: <Substreams size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://thegraph.com/docs/en/sps/introduction/',
      titleKey: 'index.networkGuides.nonEvm.spsIntro.title',
      descriptionKey: 'index.networkGuides.nonEvm.spsIntro.description',
      minutes: 8,
      icon: <SubstreamsPoweredSubgraph size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://substreams.dev/',
      titleKey: 'index.networkGuides.nonEvm.substreamsDev.title',
      descriptionKey: 'index.networkGuides.nonEvm.substreamsDev.description',
      minutes: 10,
      icon: <Substreams size={6} />,
      className: 'min-h-64',
    },
  ],
  bottomCards: [
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
  ],
}

// Non-EVM without Token API
export const nonEvmNoTokenAPICards = {
  topCards: [
    {
      href: 'https://thegraph.com/docs/en/substreams/quick-start/',
      titleKey: 'index.networkGuides.evm.substreamsQuickStart.title',
      descriptionKey: 'index.networkGuides.evm.substreamsQuickStart.description',
      minutes: 15,
      icon: <Substreams size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://substreams.dev/',
      titleKey: 'index.networkGuides.nonEvm.substreamsDev.title',
      descriptionKey: 'index.networkGuides.nonEvm.substreamsDev.description',
      minutes: 10,
      icon: <Substreams size={6} />,
      className: 'min-h-64',
    },
    {
      href: 'https://docs.substreams.dev/how-to-guides/sinks',
      titleKey: 'index.networkGuides.nonEvm.customSubstreamsSinks.title',
      descriptionKey: 'index.networkGuides.nonEvm.customSubstreamsSinks.description',
      minutes: 8,
      icon: <Substreams size={6} />,
      className: 'min-h-64',
    },
  ],
  bottomCards: [
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
  ],
}
