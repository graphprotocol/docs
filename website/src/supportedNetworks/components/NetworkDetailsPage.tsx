import { Card, TimeIcon } from '@/components'
import { useI18n } from '@/i18n'

import { isEVMNetwork, type Network, type NetworkData, type ProcessedNetwork, supportsTokenAPI } from '../utils'

import {
  evmNoTokenAPICards,
  evmSubgraphsOnlyCards,
  evmWithTokenAPICards,
  nonEvmNoTokenAPICards,
  nonEvmWithTokenAPICards,
} from './ResourceCards'

type NetworkDetailsPageProps = {
  network: Network | ProcessedNetwork | NetworkData
}

interface NetworkFeatures {
  supportsSubgraphs: boolean
  supportsSubstreams: boolean
  supportsTokenAPI: boolean
}

function getNetworkFeatures(network: Network | ProcessedNetwork | NetworkData): NetworkFeatures {
  if ('subgraphs' in network && typeof network.subgraphs === 'boolean') {
    const processedNetwork = network
    return {
      supportsSubgraphs: processedNetwork.subgraphs,
      supportsSubstreams: processedNetwork.substreams,
      supportsTokenAPI: processedNetwork.tokenapi,
    }
  }

  return {
    supportsSubgraphs: 'services' in network && Boolean(network.services.subgraphs?.length),
    supportsSubstreams: 'services' in network && Boolean(network.services.substreams?.length),
    supportsTokenAPI: supportsTokenAPI(network.id),
  }
}

function getResourceCardsConfig(isEVM: boolean, features: NetworkFeatures) {
  const { supportsSubgraphs, supportsSubstreams, supportsTokenAPI } = features

  if (isEVM) {
    if (supportsSubgraphs && !supportsSubstreams) {
      return evmSubgraphsOnlyCards
    }
    if (supportsTokenAPI) {
      return evmWithTokenAPICards
    }
    return evmNoTokenAPICards
  }

  return supportsTokenAPI ? nonEvmWithTokenAPICards : nonEvmNoTokenAPICards
}

function NetworkDetailsPage({ network }: NetworkDetailsPageProps) {
  const { t } = useI18n()
  const isEVM = isEVMNetwork(network)
  const features = getNetworkFeatures(network)
  const cards = getResourceCardsConfig(isEVM, features)

  return (
    <>
      <h3 className="text-h18">{t('index.supportedNetworks.guides')}</h3>
      <div className="grid grid-cols-6 gap-4">
        {cards.map((card) => (
          <Card
            key={t(card.titleKey)}
            href={card.href}
            title={t(card.titleKey)}
            description={t(card.descriptionKey)}
            slotAboveTitle={<TimeIcon variant="reading" minutes={card.minutes} />}
            className="col-span-full [&:nth-child(-n+3)]:lg:col-span-2 [&:nth-child(-n+3)]:lg:min-h-64 [&:nth-child(n+4)]:lg:col-span-3"
            icon={card.icon}
          />
        ))}
      </div>
    </>
  )
}

export default NetworkDetailsPage
