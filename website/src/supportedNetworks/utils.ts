import { type Network, NetworksRegistry } from '@pinax/graph-networks-registry'

// Networks that should use the "mono" icon variant (TODO: add this feature to web3icons?)
const MONO_ICON_NETWORKS = [
  'arweave-mainnet',
  'autonomys-taurus',
  'expchain-testnet',
  'fraxtal',
  'lens',
  'lens-testnet',
  'linea',
  'linea-sepolia',
  'lumia',
  'mbase',
  'megaeth-testnet',
  'soneium',
  'soneium-testnet',
  'sonic',
  'stellar',
  'vana',
  'vana-moksha',
  'xlayer-mainnet',
  'xlayer-sepolia',
  'zksync-era',
  'zksync-era-sepolia',
]

export async function getSupportedNetworks() {
  const registry = await NetworksRegistry.fromLatestVersion()
  return registry.networks
    .flatMap((network) => {
      const [subgraphsSupportLevel, subgraphsProvider] = getSubgraphsSupportLevelAndProvider(network)
      // Substreams and Firehose share one combined signal (see getFirehoseSubstreamsSupportLevel);
      // both columns render the same mark.
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
          iconVariant: getIconVariant(network),
          subgraphsSupportLevel,
          subgraphsProvider,
          substreamsSupportLevel,
          firehoseSupportLevel,
        },
      ]
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
}

function isEvm(network: Network) {
  return network.caip2Id.startsWith('eip155:')
}

function getIconVariant(network: Network): 'mono' | 'branded' {
  return MONO_ICON_NETWORKS.includes(network.id) ? 'mono' : 'branded'
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
