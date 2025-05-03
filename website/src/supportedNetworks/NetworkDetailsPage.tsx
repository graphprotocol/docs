import { ExperimentalCopyButton, ExperimentalDescriptionList, ExperimentalLink } from '@edgeandnode/gds'
import { NetworkIcon } from '@edgeandnode/go'

import { Card, TimeIcon } from '@/components'
import { useI18n } from '@/i18n'

import {
  evmNoTokenAPICards,
  evmSubgraphsOnlyCards,
  evmWithTokenAPICards,
  nonEvmNoTokenAPICards,
  nonEvmWithTokenAPICards,
} from './ResourceCards'
import { getIconVariant, type SupportedNetwork } from './utils'

export default function NetworkDetailsPage({ network }: { network: SupportedNetwork }) {
  const { t } = useI18n()
  const cards = (() => {
    if (network.evm) {
      if (network.subgraphs && !network.substreams) {
        return evmSubgraphsOnlyCards
      } else if (network.tokenApi) {
        return evmWithTokenAPICards
      } else {
        return evmNoTokenAPICards
      }
    } else {
      if (network.tokenApi) {
        return nonEvmWithTokenAPICards
      } else {
        return nonEvmNoTokenAPICards
      }
    }
  })()

  return (
    <div className="col-[container]">
      <div className="mb-5 mt-12 flex flex-col gap-3">
        <NetworkIcon network={network} variant={getIconVariant(network.id)} size={10} />
        <h2 className="leading-tight mt-0 text-24 text-white">{network.fullName}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div>
            <ExperimentalDescriptionList size="medium">
              <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.type')}>
                {network.networkType}
              </ExperimentalDescriptionList.Item>
              {network.graphNode?.protocol && (
                <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.protocol')}>
                  {network.graphNode.protocol}
                </ExperimentalDescriptionList.Item>
              )}
              {network.id && (
                <ExperimentalDescriptionList.Item
                  variant="mono"
                  label={t('index.supportedNetworks.identifier')}
                  action={<ExperimentalCopyButton size="small" variant="naked" value={network.id} />}
                >
                  {network.id}
                </ExperimentalDescriptionList.Item>
              )}
              {network.caip2Id && (
                <ExperimentalDescriptionList.Item
                  variant="mono"
                  label={t('index.supportedNetworks.chainId')}
                  action={<ExperimentalCopyButton size="small" variant="naked" value={network.caip2Id} />}
                >
                  {network.caip2Id}
                </ExperimentalDescriptionList.Item>
              )}
              {network.nativeToken && (
                <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.nativeCurrency')}>
                  {network.nativeToken}
                </ExperimentalDescriptionList.Item>
              )}
              {network.docsUrl && (
                <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.docs')}>
                  <ExperimentalLink className="text-14" href={network.docsUrl} target="_blank">
                    {network.docsUrl}
                  </ExperimentalLink>
                </ExperimentalDescriptionList.Item>
              )}
            </ExperimentalDescriptionList>
          </div>
        </div>
      </div>

      <hr />

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
    </div>
  )
}
