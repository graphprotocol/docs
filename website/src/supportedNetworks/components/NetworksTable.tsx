import { AnimatePresence } from 'framer-motion'
import { memo } from 'react'

import { Text } from '@edgeandnode/gds'

import { Table } from '@/components'
import { useI18n } from '@/i18n'

import { NetworkRow } from './NetworkRow'
import { SkeletonRow } from './SkeletonRow'

interface NetworksTableProps {
  networks: any[]
  isLoading: boolean
  locale: string
}

export const NetworksTable = memo(({ networks, isLoading, locale }: NetworksTableProps) => {
  const { t } = useI18n()

  // Generate skeleton rows for loading state
  const skeletonRows = Array.from({ length: 20 }, (_, index) => <SkeletonRow key={`skeleton-${index}`} />)

  return (
    <Table variant="supported-networks">
      <tbody>
        <tr>
          <th className="min-w-46">
            <Text.C10>{t('index.supportedNetworks.tableHeaders.name')}</Text.C10>
          </th>
          <th className="min-w-46">
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
            <Text.C10>{t('index.supportedNetworks.tableHeaders.tokenapi')}</Text.C10>
          </th>
        </tr>
        {isLoading ? (
          skeletonRows
        ) : (
          <AnimatePresence initial={false}>
            {networks.map((network) => (
              <NetworkRow key={network.id} network={network} locale={locale} />
            ))}
          </AnimatePresence>
        )}
      </tbody>
    </Table>
  )
})
