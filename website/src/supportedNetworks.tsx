import { NetworksRegistry } from '@pinax/graph-networks-registry'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { ExperimentalLink, Text } from '@edgeandnode/gds'

import { Callout } from '@/components'
import { EmptySearchResults, NetworkFilters, NetworksTable } from '@/components/supported-networks'
import { useI18n } from '@/i18n'
import { processNetworksData } from '@/utils/networkUtils'

export async function getSupportedNetworks() {
  const registry = await NetworksRegistry.fromLatestVersion()
  return processNetworksData(registry.networks)
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
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingTestnets, setIsLoadingTestnets] = useState(false)
  const [hasLoadedDataBefore, setHasLoadedDataBefore] = useState(false)
  const [noResults, setNoResults] = useState(false)

  useEffect(() => {
    if (networks.length > 0) {
      setIsLoading(false)
      setHasLoadedDataBefore(true)
    } else {
      setIsLoading(true)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [networks])

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

  useEffect(() => {
    setNoResults(filteredNetworks.length === 0 && searchQuery !== '')
  }, [filteredNetworks.length, searchQuery])

  const handleClearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  const handleShowTestnets = useCallback(() => {
    if (noResults) {
      setSearchQuery('')
    }

    setIsLoadingTestnets(true)

    setTimeout(() => {
      setShowTestnets(true)
      setIsLoadingTestnets(false)
    }, 150)
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

  const shouldShowLoadingScreen = isLoading || (isLoadingTestnets && !hasLoadedDataBefore)

  return (
    <>
      <Callout variant="info" className="mb-6 flex items-center">
        <Text.P14>
          {t('index.supportedNetworks.infoText')}{' '}
          <ExperimentalLink href="https://thegraph.com/docs/en/indexing/chain-integration-overview/">
            {t('index.supportedNetworks.infoLink')}
          </ExperimentalLink>
          .
        </Text.P14>
      </Callout>

      <NetworkFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQueryCallback}
        showTestnets={showTestnets}
        isLoadingTestnets={isLoadingTestnets}
        onToggleTestnets={handleToggleTestnets}
      />

      {shouldShowLoadingScreen ? (
        <NetworksTable networks={[]} isLoading={true} locale={locale} />
      ) : filteredNetworks.length > 0 ? (
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
