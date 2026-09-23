import { Fragment } from 'react'

import { ExperimentalCopyButton, ExperimentalDescriptionList, ExperimentalLink } from '@edgeandnode/gds'
import { NetworkIcon } from '@edgeandnode/go'

import { Card, Heading, TimeIcon } from '@/components'
import { useI18n } from '@/i18n'

import { customNetworkContent } from './customContent'
import { subgraphsAndSubstreamsCards, subgraphsOnlyCards, substreamsOnlyCards } from './ResourceCards'
import { type SubstreamsTier, type SupportedNetwork } from './utils'

// Product-support rows shown at the top of each network page. Labels mirror the tiers used
// in the Supported Networks table (see ./utils), rendered here as plain text instead of chips.
// The Subgraphs row is built from the underlying flags rather than the single top tier, so a
// network that earns rewards *and* relies on backstop indexing (e.g. Rootstock) shows both.
const SUBGRAPHS_STUDIO_URL = 'https://thegraph.com/studio/'
const SUBGRAPHS_REWARDS_URL =
  'https://thegraph.com/docs/en/subgraphs/developing/deploying-publishing/publishing-a-subgraph/'
function getSubgraphsRow(network: SupportedNetwork): {
  linkLabel: string
  suffixes: { label: string; href?: string }[]
} {
  const suffixes: { label: string; href?: string }[] = []
  if (network.subgraphsBackstop) suffixes.push({ label: 'Community Indexing' })
  if (network.issuanceRewards) suffixes.push({ label: 'Network Rewards', href: SUBGRAPHS_REWARDS_URL })
  // Networks without Studio deploys still use Studio for API keys and billing.
  return { linkLabel: network.subgraphsStudio ? 'Subgraph Studio' : 'Subgraph Studio (API Keys)', suffixes }
}
const SUBSTREAMS_MODEL_LABEL: Record<Exclude<SubstreamsTier, 'none'>, string> = {
  other: 'Non-EVM',
  base: 'Base EVM',
  extended: 'Extended EVM',
}
// Substreams provider endpoints (from `services.substreams`) mapped to their public brand + link.
const SUBSTREAMS_PROVIDERS: { match: string; name: string; href: string }[] = [
  { match: 'streamingfast.io', name: 'The Graph Market', href: 'https://thegraph.market/' },
  { match: 'pinax.network', name: 'Pinax Network', href: 'https://pinax.network/' },
  { match: 'data.nexus', name: 'Data Nexus', href: 'https://data.nexus/' },
]

export default function NetworkDetailsPage({ network }: { network: SupportedNetwork }) {
  const { t } = useI18n()
  const CustomContent = customNetworkContent[network.id]
  // Providers listed under `services.substreams` in the networks registry, kept in a stable
  // brand-preferred order (The Graph Market, then Pinax Network, then Data Nexus).
  const substreamsProviders = SUBSTREAMS_PROVIDERS.filter((provider) =>
    (network.services.substreams ?? []).some((url) => url.includes(provider.match)),
  )
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
  // 2-on-bottom layout.
  const guidesItemClassName =
    cards.length === 6
      ? 'col-span-full lg:col-span-2 lg:min-h-64'
      : 'col-span-full [&:nth-child(-n+3)]:lg:col-span-2 [&:nth-child(-n+3)]:lg:min-h-64 [&:nth-child(n+4)]:lg:col-span-3'

  return (
    <div className="col-[container]">
      <div className="mb-5 mt-12 flex flex-col gap-3">
        <NetworkIcon network={network} variant={network.iconVariant} size={10} />
        <h2 className="leading-tight mt-0 text-24 text-white">{network.fullName}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div>
            <ExperimentalDescriptionList size="medium">
              {network.subgraphsTier !== 'none' &&
                (() => {
                  const subgraphs = getSubgraphsRow(network)
                  return (
                    <ExperimentalDescriptionList.Item label="Subgraphs">
                      <ExperimentalLink className="text-14" href={SUBGRAPHS_STUDIO_URL} target="_blank">
                        {subgraphs.linkLabel}
                      </ExperimentalLink>
                      {subgraphs.suffixes.map((suffix) => (
                        <Fragment key={suffix.label}>
                          {' • '}
                          {suffix.href ? (
                            <ExperimentalLink className="text-14" href={suffix.href} target="_blank">
                              {suffix.label}
                            </ExperimentalLink>
                          ) : (
                            suffix.label
                          )}
                        </Fragment>
                      ))}
                    </ExperimentalDescriptionList.Item>
                  )
                })()}
              {network.substreamsTier !== 'none' && (
                <ExperimentalDescriptionList.Item
                  label={`Substreams (${SUBSTREAMS_MODEL_LABEL[network.substreamsTier]})`}
                >
                  {substreamsProviders.length > 0
                    ? substreamsProviders.map((provider, index) => (
                        <Fragment key={provider.name}>
                          {index > 0 && ' • '}
                          <ExperimentalLink className="text-14" href={provider.href} target="_blank">
                            {provider.name}
                          </ExperimentalLink>
                        </Fragment>
                      ))
                    : null}
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
                    {network.docsUrl}
                  </ExperimentalLink>
                </ExperimentalDescriptionList.Item>
              )}
            </ExperimentalDescriptionList>
          </div>
        </div>
      </div>

      <hr />

      {CustomContent && (
        <div className="mb-16 mt-8">
          <CustomContent />
        </div>
      )}

      <Heading.H3>{t('index.supportedNetworks.guides')}</Heading.H3>
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
