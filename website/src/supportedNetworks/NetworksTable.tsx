import { useMemo, useState } from 'react'

import {
  ButtonOrLink,
  DottedRingsSpinner,
  ExperimentalButton,
  ExperimentalCopyButton,
  ExperimentalLink,
  ExperimentalSearch,
  ExperimentalToggleChip,
  Text,
  useDebounce,
} from '@edgeandnode/gds'
import { Check, EyeClosed } from '@edgeandnode/gds/icons'
import { NetworkIcon } from '@edgeandnode/go'

import { Callout, Table } from '@/components'
import { useI18n } from '@/i18n'

import { getIconVariant, type SupportedNetwork } from './utils'

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
          {t('index.supportedNetworks.infoText')}{' '}
          <ExperimentalLink href="/indexing/chain-integration-overview/">
            {t('index.supportedNetworks.infoLink')}
          </ExperimentalLink>
          .
        </p>
      </Callout>

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
              <th className="min-w-47">
                <Text.C10>{t('index.supportedNetworks.tableHeaders.id')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('index.supportedNetworks.tableHeaders.subgraphs')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('index.supportedNetworks.tableHeaders.substreams')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('index.supportedNetworks.tableHeaders.firehose')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('index.supportedNetworks.tableHeaders.tokenApi')}</Text.C10>
              </th>
            </tr>
            {filteredNetworks.map((network) => (
              <tr
                key={network.id}
                className="group/table-row isolate -outline-offset-1 transition hocus-visible-within:bg-space-1600 has-[a:focus-visible]:outline-focus"
              >
                <td>
                  <ButtonOrLink href={`/supported-networks/${network.id}`} className="static outline-none">
                    <span className="flex items-center gap-2">
                      <NetworkIcon network={network} variant={getIconVariant(network.id)} size={5} />
                      <span className="text-body-xsmall">{network.shortName}</span>
                    </span>
                    <span className="absolute inset-y-0 start-0 z-10 w-[1999px]" />
                  </ButtonOrLink>
                </td>
                <td>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-xsmall">{network.id}</span>
                    <div className="z-20 shrink-0 opacity-0 transition group-focus-within/table-row:opacity-100 group-hover/table-row:opacity-100">
                      <ExperimentalCopyButton size="small" variant="tertiary" value={network.id} />
                    </div>
                  </div>
                </td>
                <td align="center">{network.subgraphs ? <Check size={4} alt="Checkmark" /> : null}</td>
                <td align="center">{network.substreams ? <Check size={4} alt="Checkmark" /> : null}</td>
                <td align="center">{network.firehose ? <Check size={4} alt="Checkmark" /> : null}</td>
                <td align="center">{network.tokenApi ? <Check size={4} alt="Checkmark" /> : null}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
