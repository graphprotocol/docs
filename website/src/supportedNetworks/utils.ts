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
      const substreamsSupportLevel = getSubstreamsSupportLevel(network)
      const firehoseSupportLevel = getFirehoseSupportLevel(network)
      const tokenApiSupportLevel = getTokenApiSupportLevel(network)
      if (
        subgraphsSupportLevel === 'none' &&
        substreamsSupportLevel === 'none' &&
        firehoseSupportLevel === 'none' &&
        tokenApiSupportLevel === 'none'
      ) {
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
          tokenApiSupportLevel,
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
    if (providers.some((provider) => /^((https?:)?\/\/)?api\.studio\.thegraph\.com\//.test(provider))) {
      provider = 'Subgraph Studio'
    } else if (providers.some((provider) => /^((https?:)?\/\/)?(www\.)?streamingfast\.io\//.test(provider))) {
      provider = 'StreamingFast'
    }
    if (network.issuanceRewards) {
      return ['full', provider]
    }
    return ['basic', provider]
  }
  return ['none', null]
}

function getSubstreamsSupportLevel(network: Network): 'none' | 'basic' | 'full' {
  const providerCount = network.services.substreams?.length || 0
  if (providerCount >= 2) return 'full'
  if (providerCount === 1) return 'basic'
  return 'none'
}

function getFirehoseSupportLevel(network: Network): 'none' | 'basic' | 'full' {
  const providerCount = network.services.firehose?.length || 0
  if (providerCount >= 2) return 'full'
  if (providerCount === 1) return 'basic'
  return 'none'
}

function getTokenApiSupportLevel(network: Network): 'none' | 'full' {
  const providerCount = network.services.tokenApi?.length || 0
  if (providerCount >= 1) return 'full'
  return 'none'
}

export type SupportedNetwork = Awaited<ReturnType<typeof getSupportedNetworks>>[number]

export async function getSupportedNetworksStaticProps() {
  return {
    props: {
      networks: await getSupportedNetworks(),
    },
  }
}
