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
  'megaeth-testnet',
]

// TODO(@hayderkg, @benface): Add network icons to GDS for these networks
// Skeleton networks (no icon available)
export const MISSING_ICON_NETWORKS = ['ink-sepolia']

// Non-EVM networks
export const NON_EVM_NETWORKS = [
  'eos',
  'jungle4',
  'kylin',
  'telos-testnet',
  'telos',
  'wax-testnet',
  'wax',
  'arweave-mainnet',
  'gnosis-chiado-cl',
  'gnosis-cl',
  'holesky-cl',
  'mainnet-cl',
  'sepolia-cl',
  'btc',
  'litecoin',
  'injective-mainnet',
  'injective-testnet',
  'mantra-mainnet',
  'mantra-testnet',
  'near-mainnet',
  'near-testnet',
  'solana-accounts',
  'solana-devnet',
  'solana-mainnet',
  'solana-mainnet-beta',
  'solana-testnet',
  'starknet-mainnet',
  'starknet-testnet',
]

// Networks with Token API support (TODO: remove once the registry has this information)
export const TOKEN_API_NETWORKS = ['mainnet', 'base', 'bsc', 'arbitrum-one', 'matic', 'optimism']

export const getIconVariant = (networkId: string): 'mono' | 'branded' => {
  return MONO_ICON_NETWORKS.includes(networkId) ? 'mono' : 'branded'
}

export const shouldShowSkeleton = (networkId: string): boolean => {
  return MISSING_ICON_NETWORKS.includes(networkId) || !networkId
}

export const isNonEVMNetwork = (networkId: string): boolean => {
  return NON_EVM_NETWORKS.includes(networkId)
}

export const supportsTokenAPI = (networkId: string): boolean => {
  return TOKEN_API_NETWORKS.includes(networkId)
}

export interface NetworkData {
  id: string
  shortName: string
  fullName: string
  networkType: string
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
  networkType: string
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
