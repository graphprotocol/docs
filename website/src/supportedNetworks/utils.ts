import { type Network, NetworksRegistry } from '@pinax/graph-networks-registry'

export async function getSupportedNetworks() {
  const registry = await NetworksRegistry.fromLatestVersion()
  return registry.networks
    .flatMap((network) => {
      const [subgraphsSupportLevel, subgraphsProvider] = getSubgraphsSupportLevelAndProvider(network)
      // Substreams and Firehose share one combined signal (see getFirehoseSubstreamsSupportLevel)
      // and are shown together in a single "Firehose/Substreams" table column. The per-service
      // aliases are kept for the network details page, which still branches on Substreams support.
      const firehoseSubstreamsSupportLevel = getFirehoseSubstreamsSupportLevel(network)
      const substreamsSupportLevel = firehoseSubstreamsSupportLevel
      const firehoseSupportLevel = firehoseSubstreamsSupportLevel
      if (subgraphsSupportLevel === 'none' && substreamsSupportLevel === 'none' && firehoseSupportLevel === 'none') {
        return []
      }
      return [
        {
          ...network,
          evm: isEvm(network),
          iconVariant: 'mono' as const,
          subgraphsSupportLevel,
          subgraphsProvider,
          substreamsSupportLevel,
          firehoseSupportLevel,
          firehoseSubstreamsSupportLevel,
        },
      ]
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
}

function isEvm(network: Network) {
  return network.caip2Id.startsWith('eip155:')
}

function getSubgraphsSupportLevelAndProvider(network: Network): ['none' | 'basic' | 'full', string | null] {
  const providers = [...new Set([...(network.services.subgraphs || []), ...(network.services.sps || [])])]
  if (providers.length > 0) {
    let provider = providers[0]!
    if (providers.some((provider) => /^((https?:)?\/\/)?api\.studio\.thegraph\.com(\/|$)/.test(provider))) {
      provider = 'Subgraph Studio'
    } else if (providers.some((provider) => /^((https?:)?\/\/)?(www\.)?streamingfast\.io(\/|$)/.test(provider))) {
      provider = 'StreamingFast'
    }
    if (network.issuanceRewards) {
      return ['full', provider]
    }
    return ['basic', provider]
  }
  return ['none', null]
}

// Substreams and Firehose share a single support signal. Both are powered by the same
// Firehose block data, so the table's "Base" vs "Extended (EVM only)" mark reflects the
// network's block model, not how many providers serve the data.
// - 'none'  -> no Firehose or Substreams provider is serving the network
// - 'basic' -> base blocks + at least one Firehose or Substreams provider (renders as a single check)
// - 'full'  -> extended (EVM) blocks + at least one Firehose or Substreams provider (renders as a double check)
function getFirehoseSubstreamsSupportLevel(network: Network): 'none' | 'basic' | 'full' {
  const hasProvider = (network.services.substreams?.length || 0) > 0 || (network.services.firehose?.length || 0) > 0
  if (!hasProvider) return 'none'
  return network.firehose?.evmExtendedModel ? 'full' : 'basic'
}

export type SupportedNetwork = Awaited<ReturnType<typeof getSupportedNetworks>>[number]

export async function getSupportedNetworksStaticProps() {
  return {
    props: {
      networks: await getSupportedNetworks(),
    },
  }
}
