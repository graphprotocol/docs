import { NetworksRegistry } from '@pinax/graph-networks-registry'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import {
  Button,
  DottedRingsSpinner,
  ExperimentalCopyButton,
  ExperimentalLink,
  ExperimentalSearch,
  ExperimentalToggleChip,
  Flex,
  LoadingSpinner,
  Skeleton,
  Text,
} from '@edgeandnode/gds'
import { Check, EyeClosed, Lightbulb } from '@edgeandnode/gds/icons'
import { NetworkIcon } from '@edgeandnode/go'

import { Table } from '@/components'
import { useI18n } from '@/i18n'

// Networks that should use the "mono" icon variant
export const MONO_ICON_NETWORKS = [
  'vana',
  'vana-moksha',
  'xlayer-mainnet',
  'xlayer-sepolia',
  'zksync-era',
  'zksync-era-sepolia',
  'sonic',
  'soneium-testnet',
  'soneium',
  'linea-sepolia',
  'linea',
  'lens-testnet',
  'expchain-testnet',
  'autonomys-taurus',
  'arweave-mainnet',
  'fraxtal',
  'lumia',
  'mbase',
]

// Skeleton networks (no icon available)
export const MISSING_ICON_NETWORKS = [
  'berachain-bepolia',
  'hoodi',
  'ink-sepolia',
  'megaeth-testnet',
  'solana-accounts',
  'manta',
]

export async function getSupportedNetworks() {
  const registry = await NetworksRegistry.fromLatestVersion()

  // Networks with Token API support
  const tokenAPINetworks = ['mainnet', 'base', 'bsc', 'arbitrum-one', 'matic', 'optimism']

  return registry.networks
    .flatMap((network) => {
      const subgraphs = Boolean(network.services.subgraphs?.length)
      const substreams = Boolean(network.services.substreams?.length)
      const firehose = Boolean(network.services.firehose?.length)
      const tokenapi = tokenAPINetworks.includes(network.id)
      if (!subgraphs && !substreams && !firehose && !tokenapi) {
        return []
      }
      return [
        {
          ...network,
          subgraphs,
          substreams,
          firehose,
          tokenapi,
        },
      ]
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
}

export async function getSupportedNetworksStaticProps() {
  return {
    props: {
      networks: await getSupportedNetworks(),
    },
  }
}

// Empty state component
interface EmptySearchResultsProps {
  searchQuery: string
  onClearSearch: () => void
  showTestnets: boolean
  onToggleTestnets: () => void
}

const EmptySearchResults = ({
  searchQuery,
  onClearSearch,
  showTestnets,
  onToggleTestnets,
}: EmptySearchResultsProps) => {
  const { t } = useI18n()

  return (
    <div className="mb-16 flex flex-col items-center justify-center border-b border-space-1400 py-16 pb-16 text-center">
      <div className="text-space-700">
        <DottedRingsSpinner>
          <EyeClosed
            size="36px"
            color="purple-100"
            alt="Information"
            sx={{
              stroke: 'purple-100',
              transform: 'translate(1px, -1.5px)',
            }}
          />
        </DottedRingsSpinner>
      </div>
      <Text.P20 className="mb-2 mt-0 font-medium">{t('index.supportedNetworks.emptySearch.title')}</Text.P20>
      <Text.P16 className="mb-6 max-w-md text-space-700">
        {t('index.supportedNetworks.emptySearch.description', [searchQuery])}
      </Text.P16>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={onClearSearch} variant="secondary" size="medium">
          {t('index.supportedNetworks.emptySearch.clearSearch')}
        </Button>
      </div>
    </div>
  )
}

// Skeleton row component for loading state
const SkeletonRow = () => {
  return (
    <tr className="h-16">
      <td className="w-48">
        <div className="flex items-center gap-2">
          <Skeleton borderRadius="FULL" height="20px" width="20px" />
          <Skeleton borderRadius="XS" height="12px" width="100px" />
        </div>
      </td>
      <td className="w-48">
        <Skeleton borderRadius="XS" height="12px" width="80px" />
      </td>
      <td align="center">
        <Skeleton borderRadius="FULL" height="14px" width="14px" className="mx-auto" />
      </td>
      <td align="center">
        <Skeleton borderRadius="FULL" height="14px" width="14px" className="mx-auto" />
      </td>
      <td align="center">
        <Skeleton borderRadius="FULL" height="14px" width="14px" className="mx-auto" />
      </td>
      <td align="center">
        <Skeleton borderRadius="FULL" height="14px" width="14px" className="mx-auto" />
      </td>
    </tr>
  )
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

  const getIconVariant = (networkId: string) => {
    return MONO_ICON_NETWORKS.includes(networkId) ? 'mono' : 'branded'
  }

  const shouldShowSkeleton = (networkId: string) => {
    return MISSING_ICON_NETWORKS.includes(networkId) || !networkId
  }

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

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  const handleShowTestnets = () => {
    if (noResults) {
      setSearchQuery('')
    }

    setIsLoadingTestnets(true)

    setTimeout(() => {
      setShowTestnets(true)
      setIsLoadingTestnets(false)
    }, 150)
  }

  const handleHideTestnets = () => {
    setShowTestnets(false)
  }

  const handleToggleTestnets = () => {
    if (!showTestnets) {
      handleShowTestnets()
    } else {
      handleHideTestnets()
    }
  }

  // Generate skeleton rows
  const skeletonRows = Array.from({ length: 20 }, (_, index) => <SkeletonRow key={`skeleton-${index}`} />)

  const shouldShowLoadingScreen = isLoading || (isLoadingTestnets && !hasLoadedDataBefore)

  return (
    <>
      <Flex.Row className="mb-6 rounded-8 bg-space-1600 p-3" align="start" gap="8px">
        <Lightbulb size={4} variant="regular" color="blue" alt="Information" className="pt-1" />
        <Flex.Column gap="4px">
          <Text.P14 className="mb-0 font-semibold">{t('index.supportedNetworks.infoTitle')}</Text.P14>
          <Text.P14>
            {t('index.supportedNetworks.infoText')}{' '}
            <ExperimentalLink href="https://thegraph.com/docs/en/indexing/chain-integration-overview/">
              {t('index.supportedNetworks.infoLink')}
            </ExperimentalLink>
          </Text.P14>
        </Flex.Column>
      </Flex.Row>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex-grow">
          <ExperimentalSearch
            placeholder={t('index.supportedNetworks.search')}
            size="small"
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            className="w-full"
          />
        </div>
        <ExperimentalToggleChip
          size="small"
          onChange={handleToggleTestnets}
          checked={showTestnets}
          disabled={isLoadingTestnets}
        >
          {isLoadingTestnets ? (
            <span className="flex items-center">
              <LoadingSpinner className="mr-2 h-4 w-4" />
              {t('index.supportedNetworks.loading')}
            </span>
          ) : (
            t('index.supportedNetworks.showTestnets')
          )}
        </ExperimentalToggleChip>
      </div>

      {shouldShowLoadingScreen ? (
        <Table variant="supported-networks">
          <tbody>
            <tr>
              <th className="w-48">
                <Text.C10>{t('supportedNetworks.name')}</Text.C10>
              </th>
              <th className="w-48">
                <Text.C10>{t('supportedNetworks.id')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('supportedNetworks.subgraphs')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('supportedNetworks.substreams')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('supportedNetworks.firehose')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('supportedNetworks.tokenapi')}</Text.C10>
              </th>
            </tr>
            {skeletonRows}
          </tbody>
        </Table>
      ) : filteredNetworks.length > 0 ? (
        <Table variant="supported-networks">
          <tbody>
            <tr>
              <th className="w-48">
                <Text.C10>{t('supportedNetworks.name')}</Text.C10>
              </th>
              <th className="w-48">
                <Text.C10>{t('supportedNetworks.id')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('supportedNetworks.subgraphs')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('supportedNetworks.substreams')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('supportedNetworks.firehose')}</Text.C10>
              </th>
              <th align="center">
                <Text.C10>{t('supportedNetworks.tokenapi')}</Text.C10>
              </th>
            </tr>
            {filteredNetworks.map((network) => (
              <NextLink key={network.id} href={`/${locale}/supported-networks/${network.id}`} className="contents">
                <tr className="group h-16 cursor-pointer transition-colors hover:bg-space-1600">
                  <td className="w-48">
                    <div className="flex items-center gap-2">
                      {shouldShowSkeleton(network.id) ? (
                        <Skeleton borderRadius="FULL" height="20px" width="20px" />
                      ) : (
                        <NetworkIcon variant={getIconVariant(network.id)} caip2Id={network.caip2Id as any} size={5} />
                      )}
                      <Text.P14>{network.shortName}</Text.P14>
                    </div>
                  </td>
                  <td className="w-48">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Text.P14 className="!mb-0">{network.id}</Text.P14>
                      <div className="opacity-0 transition-opacity group-hover:opacity-100">
                        <div
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                        >
                          <ExperimentalCopyButton size="small" variant="tertiary" value={network.id} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td align="center">{network.subgraphs ? <Check size={4} alt="Checkmark" /> : null}</td>
                  <td align="center">{network.substreams ? <Check size={4} alt="Checkmark" /> : null}</td>
                  <td align="center">{network.firehose ? <Check size={4} alt="Checkmark" /> : null}</td>
                  <td align="center">{network.tokenapi ? <Check size={4} alt="Checkmark" /> : null}</td>
                </tr>
              </NextLink>
            ))}
          </tbody>
        </Table>
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
