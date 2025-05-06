import { NetworksRegistry } from '@pinax/graph-networks-registry'

// Networks that should use the "mono" icon variant (TODO: add this feature to web3icons?)
export const MONO_ICON_NETWORKS = [
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

// Networks with Token API support (TODO: remove once the registry has this information)
export const TOKEN_API_NETWORKS = ['mainnet', 'base', 'bsc', 'arbitrum-one', 'matic', 'optimism', 'unichain']

export const getIconVariant = (networkId: string): 'mono' | 'branded' => {
  return MONO_ICON_NETWORKS.includes(networkId) ? 'mono' : 'branded'
}

export async function getSupportedNetworks() {
  const registry = await NetworksRegistry.fromLatestVersion()
  return registry.networks
    .flatMap((network) => {
      const evm = network.caip2Id.startsWith('eip155:')
      const subgraphs = Boolean(network.services.subgraphs?.length)
      const substreams = Boolean(network.services.substreams?.length)
      const firehose = Boolean(network.services.firehose?.length)
      const tokenApi = TOKEN_API_NETWORKS.includes(network.id)
      if (!subgraphs && !substreams && !firehose && !tokenApi) {
        return []
      }
      return [
        {
          ...network,
          evm,
          subgraphs,
          substreams,
          firehose,
          tokenApi,
        },
      ]
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
}

export type SupportedNetwork = Awaited<ReturnType<typeof getSupportedNetworks>>[number]

export async function getSupportedNetworksStaticProps() {
  return {
    props: {
      networks: await getSupportedNetworks(),
    },
  }
}
