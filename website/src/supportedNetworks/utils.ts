import { type Network, NetworksRegistry } from '@pinax/graph-networks-registry'

// The registry's `services.subgraphs` array may contain deployment URL strings and/or a
// backstop-support entry (the `backstopSupport` field from the networks-registry). The
// published package still types this as `string[]`, so entries are narrowed at runtime.
type SubgraphsServiceEntry = string | { backstopSupport?: string; description?: string }

export type SubgraphsTier = 'none' | 'studio' | 'network' | 'rewards'
export type SubstreamsTier = 'none' | 'other' | 'base' | 'extended'

export async function getSupportedNetworks() {
  const registry = await NetworksRegistry.fromLatestVersion()
  return registry.networks
    .flatMap((network) => {
      const subgraphsTier = getSubgraphsTier(network)
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
          iconVariant: 'mono' as const,
          subgraphsTier,
          substreamsTier,
          subgraphsSupportLevel,
          substreamsSupportLevel,
        },
      ]
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
}

function isEvm(network: Network) {
  return network.caip2Id.startsWith('eip155:')
}

// Subgraphs support has three tiers, in priority order (only the highest one applies):
// - 'rewards' -> the network earns indexing rewards (`issuanceRewards: true`)
// - 'network' -> community backstop support (any `backstopSupport` provider entry in
//                `services.subgraphs`, e.g. InfraDAO or StreamingFast) but no issuance rewards
// - 'studio'  -> deployable via Subgraph Studio (a studio deploy URL in
//                `services.subgraphs`) but neither of the above
function getSubgraphsTier(network: Network): SubgraphsTier {
  if (network.issuanceRewards) return 'rewards'
  const subgraphs = (network.services?.subgraphs ?? []) as SubgraphsServiceEntry[]
  if (subgraphs.some((entry) => typeof entry === 'object' && Boolean(entry?.backstopSupport))) {
    return 'network'
  }
  if (subgraphs.some((entry) => typeof entry === 'string' && entry.includes('studio.thegraph.com'))) {
    return 'studio'
  }
  return 'none'
}

// Substreams/Firehose support has three tiers. A network needs at least one Firehose or
// Substreams provider to show any of them; the tier then reflects the block model:
// - 'other'    -> non-EVM network (the block-model tiers below are EVM-only)
// - 'extended' -> EVM network serving the extended block model
// - 'base'     -> EVM network serving the base block model
function getSubstreamsTier(network: Network): SubstreamsTier {
  const hasProvider = (network.services?.substreams?.length ?? 0) > 0 || (network.services?.firehose?.length ?? 0) > 0
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
