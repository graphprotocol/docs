import { NetworksRegistry } from '@pinax/graph-networks-registry'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'

import { ExperimentalLink } from '@edgeandnode/gds'

import { Callout } from '@/components'
import { useI18n } from '@/i18n'

import { EmptySearchResults, NetworkFilters, NetworksTable } from './components'
import type { NetworkData, ProcessedNetwork } from './utils'
import { processNetworksData } from './utils'

export async function getSupportedNetworks(): Promise<ProcessedNetwork[]> {
  const registry = await NetworksRegistry.fromLatestVersion()
  return processNetworksData(registry.networks as NetworkData[])
}

export async function getSupportedNetworksStaticProps() {
  return {
    props: {
      networks: await getSupportedNetworks(),
    },
  }
}

export function SupportedNetworksTable({
  networks,
}: Awaited<ReturnType<typeof getSupportedNetworksStaticProps>>['props']) {
  const { t } = useI18n()
  const router = useRouter()
  const { locale = 'en' } = router
  const [searchQuery, setSearchQuery] = useState('')
  const [showTestnets, setShowTestnets] = useState(false)

  const filteredNetworks = useMemo(() => {
    let filtered = networks

    // Filter by testnet
    if (!showTestnets) {
      filtered = filtered.filter((network) => String(network.networkType) !== 'testnet')
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (network) =>
          network.id.toLowerCase().includes(query) ||
          network.shortName.toLowerCase().includes(query) ||
          network.fullName.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [networks, searchQuery, showTestnets])

  const noResults = filteredNetworks.length === 0 && searchQuery !== ''

  const handleClearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  const handleShowTestnets = useCallback(() => {
    if (noResults) {
      setSearchQuery('')
    }
    setShowTestnets(true)
  }, [noResults])

  const handleHideTestnets = useCallback(() => {
    setShowTestnets(false)
  }, [])

  const handleToggleTestnets = useCallback(() => {
    if (!showTestnets) {
      handleShowTestnets()
    } else {
      handleHideTestnets()
    }
  }, [showTestnets, handleShowTestnets, handleHideTestnets])

  const setSearchQueryCallback = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  return (
    <>
      <Callout variant="info" className="mb-6 flex items-center">
        <span className="text-p14">
          {t('index.supportedNetworks.infoText')}{' '}
          <ExperimentalLink href="https://thegraph.com/docs/en/indexing/chain-integration-overview/">
            {t('index.supportedNetworks.infoLink')}
          </ExperimentalLink>
          .
        </span>
      </Callout>

      <NetworkFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQueryCallback}
        showTestnets={showTestnets}
        onToggleTestnets={handleToggleTestnets}
      />

      {filteredNetworks.length > 0 ? (
        <NetworksTable networks={filteredNetworks} isLoading={false} locale={locale} />
      ) : (
        <EmptySearchResults
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
          showTestnets={showTestnets}
          onToggleTestnets={handleToggleTestnets}
        />
      )}
    </>
  )
}
