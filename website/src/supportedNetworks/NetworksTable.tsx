import { useMemo, useState } from 'react'

import {
  ButtonOrLink,
  classNames,
  DottedRingsSpinner,
  ExperimentalButton,
  ExperimentalCopyButton,
  ExperimentalLink,
  ExperimentalSearch,
  ExperimentalToggleChip,
  Text,
  useDebounce,
} from '@edgeandnode/gds'
import { EyeClosed } from '@edgeandnode/gds/icons'
import { NetworkIcon } from '@edgeandnode/go'

import { Callout, Table } from '@/components'
import { useI18n } from '@/i18n'

import { getNetworkSlug } from './slugs'
import { type SubgraphsTier, type SubstreamsTier, type SupportedNetwork } from './utils'

// Tier chip tones. GDS calls Galactic Aqua `turquoise` and Nebula Pink `pink`; `space` is its
// lavender-gray scale. Brighter hues use lower opacity so every chip reads with similar weight,
// on both the page and hovered row surfaces.
const TIER_CHIP_STYLES = {
  neutral: `[--tier-chip-accent:theme(colors.space-500)]
    border-space-500/15 bg-space-500/[0.12] data-[treatment=borderless]:bg-space-500/[0.18]`,
  purple: `[--tier-chip-accent:theme(colors.purple-400)]
    border-purple-300/20 bg-purple-400/[0.19] data-[treatment=borderless]:bg-purple-400/[0.29]`,
  pink: `[--tier-chip-accent:theme(colors.pink)]
    border-pink/10 bg-pink/[0.12] data-[treatment=borderless]:bg-pink/[0.18]`,
  blue: `[--tier-chip-accent:theme(colors.astro-400)]
    border-astro-300/20 bg-astro-400/[0.19] data-[treatment=borderless]:bg-astro-400/[0.29]`,
  turquoise: `[--tier-chip-accent:theme(colors.turquoise)]
    border-turquoise/10 bg-turquoise/[0.095] data-[treatment=borderless]:bg-turquoise/[0.12]`,
  green: `[--tier-chip-accent:theme(colors.starfield-400)]
    border-starfield-300/10 bg-starfield-400/[0.12] data-[treatment=borderless]:bg-starfield-400/[0.18]`,
}

type TierChipProps = { label: string; tone: keyof typeof TIER_CHIP_STYLES }

const SUBGRAPHS_CHIPS: Record<Exclude<SubgraphsTier, 'none'>, TierChipProps> = {
  studio: { label: 'STUDIO', tone: 'pink' },
  network: { label: 'COMMUNITY', tone: 'blue' },
  rewards: { label: 'REWARDS', tone: 'purple' },
}
const SUBSTREAMS_CHIPS: Record<Exclude<SubstreamsTier, 'none'>, TierChipProps> = {
  base: { label: 'BASE', tone: 'neutral' },
  extended: { label: 'EXTENDED', tone: 'turquoise' },
  other: { label: 'NON-EVM', tone: 'green' },
}

// Switch to 'borderless' to compare the stronger fill across the table and legend during development.
const TIER_CHIP_TREATMENT: 'subtle-border' | 'borderless' = 'subtle-border'

function TierChip({ label, tone }: TierChipProps) {
  return (
    <span
      data-treatment={TIER_CHIP_TREATMENT}
      className={classNames([
        `text-c10 inline-flex items-center rounded-full border
        px-[calc(theme(spacing.2)*1.1)] py-[calc(theme(spacing[0.5])*1.1)]
        text-[length:calc(theme(fontSize.10)*1.1)] leading-none tracking-normal
        text-[color:color-mix(in_srgb,var(--tier-chip-accent)_30%,theme(colors.space-200))]
        data-[treatment=borderless]:border-transparent`,
        TIER_CHIP_STYLES[tone],
      ])}
    >
      {label}
    </span>
  )
}

export function NetworksTable({ networks }: { networks: SupportedNetwork[] }) {
  const { t } = useI18n()
  const [immediateSearchQuery, setSearchQuery] = useState('')
  const [immediateShowTestnets, setShowTestnets] = useState(false)

  const searchQuery = useDebounce(immediateSearchQuery, 200)
  const showTestnets = useDebounce(immediateShowTestnets, 200)

  const filteredNetworks = useMemo(() => {
    let filteredNetworks = networks
    // Filter by testnet
    if (!showTestnets) {
      filteredNetworks = filteredNetworks.filter((network) => String(network.networkType) !== 'testnet')
    }
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredNetworks = filteredNetworks.filter(
        (network) =>
          network.id.toLowerCase().includes(query) ||
          network.shortName.toLowerCase().includes(query) ||
          network.fullName.toLowerCase().includes(query),
      )
    }
    return filteredNetworks
  }, [networks, searchQuery, showTestnets])

  return (
    <>
      <Callout variant="info" className="mb-6">
        <p>
          <ExperimentalLink href="mailto:info@thegraph.foundation">
            {t('index.supportedNetworks.infoLink')}
          </ExperimentalLink>{' '}
          {t('index.supportedNetworks.infoText')}
        </p>
      </Callout>

      <aside
        className="mb-6 overflow-clip rounded-8 border border-space-1500 bg-space-1800"
        aria-labelledby="networks-table-legend"
      >
        <h3 id="networks-table-legend" className="sr-only">
          {t('index.supportedNetworks.tableLegend.legendTitle')}
        </h3>
        <div className="grid grid-cols-1 gap-px text-space-500 xs:grid-cols-2">
          <div className="border-b border-r border-space-1500 p-4">
            <span className="text-c10 mb-3 block text-white">Subgraphs</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TierChip {...SUBGRAPHS_CHIPS.studio} />
                <span className="text-14">{t('index.supportedNetworks.tableLegend.subgraphs.studio')}</span>
              </div>
              <div className="flex items-center gap-2">
                <TierChip {...SUBGRAPHS_CHIPS.network} />
                <span className="text-14">{t('index.supportedNetworks.tableLegend.subgraphs.network')}</span>
              </div>
              <div className="flex items-center gap-2">
                <TierChip {...SUBGRAPHS_CHIPS.rewards} />
                <span className="text-14">{t('index.supportedNetworks.tableLegend.subgraphs.rewards')}</span>
              </div>
            </div>
          </div>
          <div className="border-b border-r border-space-1500 p-4 lg:border-r-0">
            <span className="text-c10 mb-3 block text-white">Firehose/Substreams</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TierChip {...SUBSTREAMS_CHIPS.base} />
                <span className="text-14">{t('index.supportedNetworks.tableLegend.substreams.base')}</span>
              </div>
              <div className="flex items-center gap-2">
                <TierChip {...SUBSTREAMS_CHIPS.extended} />
                <span className="text-14">{t('index.supportedNetworks.tableLegend.substreams.extended')}</span>
              </div>
              <div className="flex items-center gap-2">
                <TierChip {...SUBSTREAMS_CHIPS.other} />
                <span className="text-14">{t('index.supportedNetworks.tableLegend.substreams.other')}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex-grow">
          <ExperimentalSearch
            placeholder={t('index.supportedNetworks.search')}
            size="small"
            value={immediateSearchQuery}
            onChange={(value) => setSearchQuery(value)}
            className="w-full"
          />
        </div>
        <ExperimentalToggleChip
          size="small"
          checked={immediateShowTestnets}
          onChange={() => {
            setShowTestnets(!immediateShowTestnets)
          }}
        >
          {t('index.supportedNetworks.showTestnets')}
        </ExperimentalToggleChip>
      </div>

      {filteredNetworks.length === 0 ? (
        <div className="mb-16 flex flex-col items-center justify-center border-b border-space-1400 py-16 pb-16 text-center">
          <div className="text-space-700">
            <DottedRingsSpinner>
              <EyeClosed size="36px" color="purple-100" alt="Information" />
            </DottedRingsSpinner>
          </div>
          <p className="text-body-large mb-2 mt-0 font-medium">{t('index.supportedNetworks.emptySearch.title')}</p>
          <p className="text-body-small mb-6 max-w-90 text-space-700">
            {t('index.supportedNetworks.emptySearch.description', [searchQuery])}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ExperimentalButton variant="secondary" onClick={() => setSearchQuery('')}>
              {t('index.supportedNetworks.emptySearch.clearSearch')}
            </ExperimentalButton>
          </div>
        </div>
      ) : (
        <Table variant="supported-networks">
          <tbody>
            <tr>
              <th className="min-w-47">
                <Text.C10>{t('index.supportedNetworks.tableHeaders.name')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('index.supportedNetworks.tableHeaders.subgraphs')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('index.supportedNetworks.tableHeaders.firehoseSubstreams')}</Text.C10>
              </th>
            </tr>
            {filteredNetworks.map((network) => (
              <tr
                key={network.id}
                className="group/table-row isolate -outline-offset-1 transition hocus-visible-within:bg-space-1600 has-[a:focus-visible]:outline-focus"
              >
                <td>
                  <div className="static flex items-center justify-between gap-2">
                    <ButtonOrLink
                      href={`/supported-networks/${getNetworkSlug(network.id)}`}
                      className="static outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <NetworkIcon network={network} variant={network.iconVariant} size={5} />
                        <div className="flex flex-col">
                          <span className="text-body-xsmall leading-5 text-white">{network.shortName}</span>
                          <span className="text-body-xsmall leading-5 text-space-500">{network.id}</span>
                        </div>
                      </div>
                      <span className="absolute inset-y-0 start-0 z-10 w-[1999px]" />
                    </ButtonOrLink>
                    <div className="z-20 shrink-0 opacity-0 transition group-focus-within/table-row:opacity-100 group-hover/table-row:opacity-100">
                      <ExperimentalCopyButton size="small" variant="tertiary" value={network.id} />
                    </div>
                  </div>
                </td>
                <td align="center">
                  {network.subgraphsTier !== 'none' ? <TierChip {...SUBGRAPHS_CHIPS[network.subgraphsTier]} /> : null}
                </td>
                <td align="center">
                  {network.substreamsTier !== 'none' ? (
                    <TierChip {...SUBSTREAMS_CHIPS[network.substreamsTier]} />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
