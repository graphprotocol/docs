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
import { Check, Checks, EyeClosed } from '@edgeandnode/gds/icons'
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

      <div className="mb-6 overflow-clip rounded-8 border border-space-1500 bg-space-1800">
        <div className="grid grid-cols-2 gap-px text-space-500">
          <div className="border-b border-r border-space-1500 p-4">
            <Text.C10 className="mb-2 uppercase text-white">Subgraphs</Text.C10>
            <div className="flex items-center gap-2">
              <Check size={4} alt="Checkmark" />
              <span className="text-14">Subgraph Studio (No issuance)</span>
            </div>
            <div className="flex items-center gap-2">
              <Checks size={4} alt="Checkmarks" />
              <span className="text-14">The Graph Network (Issuance)</span>
            </div>
          </div>
          <div className="border-b border-r border-space-1500 p-4 lg:border-r-0">
            <Text.C10 className="mb-2 uppercase text-white">Substreams</Text.C10>
            <div className="flex items-center gap-2">
              <Check size={4} alt="Checkmark" />
              <span className="text-14">Base</span>
            </div>
            <div className="flex items-center gap-2">
              <Checks size={4} alt="Checkmarks" />
              <span className="text-14">Extended (EVM Only)</span>
            </div>
          </div>
          <div className="border-b border-r border-space-1500 p-4">
            <Text.C10 className="mb-2 uppercase text-white">Firehose</Text.C10>
            <div className="flex items-center gap-2">
              <Check size={4} alt="Checkmark" />
              <span className="text-14">Base</span>
            </div>
            <div className="flex items-center gap-2">
              <Checks size={4} alt="Checkmarks" />
              <span className="text-14">Extended (EVM Only)</span>
            </div>
          </div>
          <div className="p-4">
            <Text.C10 className="mb-2 uppercase text-white">Token API</Text.C10>
            <div className="flex items-center gap-2">
              <Check size={4} alt="Checkmark" />
              <span className="text-14">All endpoints supported</span>
            </div>
          </div>
        </div>
      </div>

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
                  <div className="flex items-center justify-between gap-2">
                    <ButtonOrLink href={`/supported-networks/${network.id}`} className="static outline-none">
                      <div className="flex items-center gap-3">
                        <NetworkIcon network={network} variant={getIconVariant(network.id)} size={5} />
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
                  {network.subgraphsSupportLevel === 'full' ? (
                    <Checks size={4} alt="Checkmarks" />
                  ) : network.subgraphsSupportLevel === 'basic' ? (
                    <Check size={4} alt="Checkmark" />
                  ) : null}
                </td>
                <td align="center">
                  {network.substreamsSupportLevel === 'full' ? (
                    <Checks size={4} alt="Checkmarks" />
                  ) : network.substreamsSupportLevel === 'basic' ? (
                    <Check size={4} alt="Checkmark" />
                  ) : null}
                </td>
                <td align="center">
                  {network.firehoseSupportLevel === 'full' ? (
                    <Checks size={4} alt="Checkmarks" />
                  ) : network.firehoseSupportLevel === 'basic' ? (
                    <Check size={4} alt="Checkmark" />
                  ) : null}
                </td>
                <td align="center">{network.tokenApi ? <Check size={4} alt="Checkmark" /> : null}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
