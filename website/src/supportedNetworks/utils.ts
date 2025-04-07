import { NetworksRegistry, NetworkType } from '@pinax/graph-networks-registry'

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
export const TOKEN_API_NETWORKS = ['mainnet', 'base', 'bsc', 'arbitrum-one', 'matic', 'optimism']

export const getIconVariant = (networkId: string): 'mono' | 'branded' => {
  return MONO_ICON_NETWORKS.includes(networkId) ? 'mono' : 'branded'
}

export interface Network {
  id: string
  fullName: string
  shortName?: string
  networkType: NetworkType
  graphNode?: {
    protocol: string
  }
  caip2Id: string
  nativeToken?: string
  docsUrl?: string
}

export interface NetworkData {
  id: string
  shortName: string
  fullName: string
  networkType: NetworkType
  caip2Id: string
  services: {
    subgraphs?: any[]
    substreams?: any[]
    firehose?: any[]
  }
}

export interface ProcessedNetwork {
  id: string
  shortName: string
  fullName: string
  networkType: NetworkType
  caip2Id: string
  subgraphs: boolean
  substreams: boolean
  firehose: boolean
  tokenapi: boolean
  services: {
    subgraphs?: any[]
    substreams?: any[]
    firehose?: any[]
  }
}

export const processNetworksData = (networks: NetworkData[]): ProcessedNetwork[] => {
  return networks
    .flatMap((network) => {
      const subgraphs = Boolean(network.services.subgraphs?.length)
      const substreams = Boolean(network.services.substreams?.length)
      const firehose = Boolean(network.services.firehose?.length)
      const tokenapi = TOKEN_API_NETWORKS.includes(network.id)
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

export const isEVMNetwork = (network: Network | NetworkData): boolean => {
  return network.caip2Id.startsWith('eip155:')
}

export async function getSupportedNetworks(): Promise<ProcessedNetwork[]> {
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
