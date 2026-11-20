import { type Network as PinaxNetwork } from '@pinax/graph-networks-registry'

// The networks registry is read straight from its published v0.8.x JSON rather than through
// `@pinax/graph-networks-registry`. That library (latest 0.7.1) only fetches the v0.7.x feed,
// which strips the structured `services.subgraphs` entries (gateway/studio/backstop) that the
// Subgraphs tiers below depend on, and its parser types `subgraphs` as `string[]`.
// The v0.8.x file is otherwise identical to v0.7.x. When a registry v0.9 ships, update these
// URLs, or switch back to the library once a matching version is published.
const REGISTRY_URLS = [
  'https://networks-registry.thegraph.com/TheGraphNetworksRegistry_v0_8_x.json',
  // Same file on GitHub, used if the primary host is unreachable (mirrors the library's fallback).
  'https://raw.githubusercontent.com/graphprotocol/networks-registry/refs/heads/main/public/TheGraphNetworksRegistry_v0_8_x.json',
]

// v0.8 `services.subgraphs` entries: bare deployment URL strings and/or structured
// `{ kind, provider, description }` entries, where `kind` is 'gateway', 'studio' or 'backstop'
// (e.g. `{ kind: 'backstop', provider: 'infradao' }`). The legacy `{ backstopSupport }` shape
// is still accepted.
type SubgraphsServiceEntry =
  | string
  | { kind?: 'gateway' | 'studio' | 'backstop'; provider?: string; description?: string; backstopSupport?: string }

// The library's `Network` type, with `services.subgraphs` widened to the v0.8 entry shape.
type Network = Omit<PinaxNetwork, 'services'> & {
  services: Omit<PinaxNetwork['services'], 'subgraphs'> & { subgraphs?: SubgraphsServiceEntry[] }
}

async function fetchRegistryNetworks(): Promise<Network[]> {
  const errors: string[] = []
  for (const url of REGISTRY_URLS) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const registry = (await response.json()) as { networks?: Network[] }
      if (!Array.isArray(registry.networks)) throw new Error('missing `networks` array')
      return registry.networks
    } catch (error) {
      errors.push(`${url}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  throw new Error(`Failed to fetch the networks registry:\n${errors.join('\n')}`)
}

function getSubgraphsEntries(network: Network): SubgraphsServiceEntry[] {
  return network.services.subgraphs ?? []
}

// Deployable via Subgraph Studio: a bare Studio deploy URL or a `kind: 'studio'` entry.
function hasStudioSupport(network: Network): boolean {
  return getSubgraphsEntries(network).some((entry) =>
    typeof entry === 'string'
      ? entry.includes('studio.thegraph.com')
      : entry.kind === 'studio' || Boolean(entry.provider?.includes('studio.thegraph.com')),
  )
}

// Community backstop indexing: a `kind: 'backstop'` entry (or the legacy `backstopSupport` field).
function hasBackstopSupport(network: Network): boolean {
  return getSubgraphsEntries(network).some(
    (entry) => typeof entry !== 'string' && (entry.kind === 'backstop' || Boolean(entry.backstopSupport)),
  )
}

export type SubgraphsTier = 'none' | 'studio' | 'network' | 'rewards'
export type SubstreamsTier = 'none' | 'other' | 'base' | 'extended'

export async function getSupportedNetworks() {
  const networks = await fetchRegistryNetworks()
  return networks
    .flatMap((network) => {
      const subgraphsStudio = hasStudioSupport(network)
      const subgraphsBackstop = hasBackstopSupport(network)
      const subgraphsTier = getSubgraphsTier(network, subgraphsStudio, subgraphsBackstop)
      const substreamsTier = getSubstreamsTier(network)
      // Drop networks that would show no chip in either product column.
      if (subgraphsTier === 'none' && substreamsTier === 'none') {
        return []
      }
      // Coarse support flags kept for the network details page, which only branches on
      // whether each product is supported at all.
      const subgraphsSupportLevel = subgraphsTier === 'none' ? 'none' : network.issuanceRewards ? 'full' : 'basic'
      const substreamsSupportLevel =
        substreamsTier === 'none' ? 'none' : substreamsTier === 'extended' ? 'full' : 'basic'
      return [
        {
          ...network,
          evm: isEvm(network),
          iconVariant: getIconVariant(network),
          subgraphsTier,
          subgraphsStudio,
          subgraphsBackstop,
          substreamsTier,
          subgraphsSupportLevel,
          substreamsSupportLevel,
        },
      ]
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
}

// Networks render with mono icons, except those the registry lists without a mono variant
// (`icon.web3Icons.variants`, e.g. Zora), which fall back to their branded icon for now.
function getIconVariant(network: Network): 'mono' | 'branded' {
  const variants = network.icon?.web3Icons?.variants
  return variants && !variants.includes('mono') && variants.includes('branded') ? 'branded' : 'mono'
}

function isEvm(network: Network) {
  return network.caip2Id.startsWith('eip155:')
}

// Subgraphs support has three tiers, in priority order (only the highest one applies):
// - 'rewards' -> the network earns indexing rewards (`issuanceRewards: true`)
// - 'network' -> community backstop support (a `kind: 'backstop'` entry in
//                `services.subgraphs`, e.g. InfraDAO or StreamingFast) but no issuance rewards
// - 'studio'  -> deployable via Subgraph Studio (a Studio deploy URL or `kind: 'studio'` entry
//                in `services.subgraphs`) but neither of the above
// A bare `kind: 'gateway'` entry on its own does not earn a tier.
function getSubgraphsTier(network: Network, studio: boolean, backstop: boolean): SubgraphsTier {
  if (network.issuanceRewards) return 'rewards'
  if (backstop) return 'network'
  if (studio) return 'studio'
  return 'none'
}

// Substreams/Firehose support has three tiers. A network needs at least one Firehose or
// Substreams provider to show any of them; the tier then reflects the block model:
// - 'other'    -> non-EVM network (the block-model tiers below are EVM-only)
// - 'extended' -> EVM network serving the extended block model
// - 'base'     -> EVM network serving the base block model
function getSubstreamsTier(network: Network): SubstreamsTier {
  const hasProvider = (network.services.substreams?.length ?? 0) > 0 || (network.services.firehose?.length ?? 0) > 0
  if (!hasProvider) return 'none'
  if (!isEvm(network)) return 'other'
  return network.firehose?.evmExtendedModel ? 'extended' : 'base'
}

export type SupportedNetwork = Awaited<ReturnType<typeof getSupportedNetworks>>[number]

export async function getSupportedNetworksStaticProps() {
  return {
    props: {
      networks: await getSupportedNetworks(),
    },
  }
}
