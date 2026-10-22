import { ExperimentalCopyButton, ExperimentalDescriptionList, ExperimentalLink } from '@edgeandnode/gds'
import { NetworkIcon } from '@edgeandnode/go'

import { Card, Heading, TimeIcon } from '@/components'
import { useI18n } from '@/i18n'

import { customNetworkContent } from './customContent'
import { NetworkContext } from './NetworkContext'
import { subgraphsAndSubstreamsCards, subgraphsOnlyCards, substreamsOnlyCards } from './ResourceCards'
import { type SubgraphsTier, type SubstreamsTier, type SupportedNetwork } from './utils'

// Product-support rows shown at the top of each network page. The Subgraphs row has two lines:
// payments always run through Subgraph Studio (API keys and billing), and indexing mirrors the
// network's top Subgraphs tier in the Supported Networks table (see `getSubgraphsTier` in ./utils).
const SUBGRAPHS_STUDIO_URL = 'https://thegraph.com/studio/'
const SUBGRAPHS_INDEXING_LABEL: Record<Exclude<SubgraphsTier, 'none'>, string> = {
  rewards: 'The Graph Network',
  network: 'Community Support',
  studio: 'Subgraph Studio',
}
const SUBSTREAMS_MODEL_LABEL: Record<Exclude<SubstreamsTier, 'none'>, string> = {
  other: 'Non-EVM',
  base: 'Base EVM',
  extended: 'Extended EVM',
}
// Substreams provider endpoints (from `services.substreams`) mapped to their public brand + link.
// Listed in preference order; only the first match is shown. Data Nexus is intentionally omitted:
// it is always available through The Graph Market.
const SUBSTREAMS_PROVIDERS: { match: string; name: string; href: string }[] = [
  { match: 'streamingfast.io', name: 'The Graph Market', href: 'https://thegraph.market/' },
  { match: 'pinax.network', name: 'Pinax Network', href: 'https://pinax.network/' },
]

export default function NetworkDetailsPage({ network }: { network: SupportedNetwork }) {
  const { t } = useI18n()
  const CustomContent = customNetworkContent[network.id]
  // The preferred Substreams provider listed under `services.substreams` in the networks registry:
  // The Graph Market when available, otherwise Pinax Network.
  const substreamsProviders = SUBSTREAMS_PROVIDERS.filter((provider) =>
    (network.services.substreams ?? []).some((url) => url.includes(provider.match)),
  ).slice(0, 1)
  const cards = (() => {
    if (network.evm) {
      const hasSubgraphs = network.subgraphsSupportLevel !== 'none'
      const hasSubstreams = network.substreamsSupportLevel !== 'none'
      if (hasSubgraphs && hasSubstreams) {
        return subgraphsAndSubstreamsCards
      }
      if (hasSubgraphs) {
        return subgraphsOnlyCards
      }
      // EVM networks with Substreams support only.
      return substreamsOnlyCards
    } else {
      return substreamsOnlyCards
    }
  })()
  // The both-products card set fills a full 3x3 grid; the other sets use a 3-on-top,
  // 2-on-bottom layout. Cards size to their content (no fixed min height).
  const guidesItemClassName =
    cards.length === 6
      ? 'col-span-full lg:col-span-2'
      : 'col-span-full [&:nth-child(-n+3)]:lg:col-span-2 [&:nth-child(n+4)]:lg:col-span-3'

  return (
    <div className="col-[container]">
      <div className="mb-5 mt-12 flex flex-col gap-3">
        <NetworkIcon network={network} variant={network.iconVariant} size={10} />
        <h2 className="text-heading-medium mt-0 text-white xs:text-heading-large">{network.fullName}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div>
            <ExperimentalDescriptionList size="medium">
              {network.subgraphsTier !== 'none' && (
                <ExperimentalDescriptionList.Item label="Subgraphs">
                  <span className="flex flex-col items-end text-right">
                    <span>
                      <ExperimentalLink className="text-14" href={SUBGRAPHS_STUDIO_URL} target="_blank">
                        Payments: Subgraph Studio
                      </ExperimentalLink>
                    </span>
                    <span>Indexing: {SUBGRAPHS_INDEXING_LABEL[network.subgraphsTier]}</span>
                  </span>
                </ExperimentalDescriptionList.Item>
              )}
              {network.substreamsTier !== 'none' && (
                <ExperimentalDescriptionList.Item
                  label={`Substreams (${SUBSTREAMS_MODEL_LABEL[network.substreamsTier]})`}
                >
                  {substreamsProviders.length > 0 ? (
                    <span className="flex flex-col items-end text-right">
                      {substreamsProviders.map((provider) => (
                        <span key={provider.name}>
                          <ExperimentalLink className="text-14" href={provider.href} target="_blank">
                            Full Service: {provider.name}
                          </ExperimentalLink>
                        </span>
                      ))}
                    </span>
                  ) : null}
                </ExperimentalDescriptionList.Item>
              )}
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
                    {network.shortName} Docs
                  </ExperimentalLink>
                </ExperimentalDescriptionList.Item>
              )}
            </ExperimentalDescriptionList>
          </div>
        </div>
      </div>

      <hr />

      {CustomContent && (
        <>
          <div className="mb-16 mt-8">
            <NetworkContext.Provider value={network}>
              <CustomContent />
            </NetworkContext.Provider>
          </div>
          <hr />
        </>
      )}

      <Heading.H2>{t('index.supportedNetworks.guides')}</Heading.H2>
      <div className="grid grid-cols-6 gap-4">
        {cards.map((card) => (
          <Card
            key={t(card.titleKey)}
            href={card.href}
            title={t(card.titleKey)}
            description={t(card.descriptionKey)}
            slotAboveTitle={<TimeIcon variant="reading" minutes={card.minutes} />}
            className={guidesItemClassName}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  )
}
