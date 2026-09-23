// Friendly URL slugs for specific Supported Networks pages.
//
// Keyed by the registry network `id`; any network not listed here uses its `id` as
// its slug. If several ids ever share one slug, `slugCanonicalId` names the network
// whose page and metadata render for that slug.
export const networkSlugs: Record<string, string> = {
  btc: 'bitcoin',
  'blast-mainnet': 'blast',
  'mainnet-cl': 'ethereum-beacon',
  'hoodi-cl': 'ethereum-hoodi',
  'sepolia-cl': 'ethereum-sepolia',
  eos: 'vaulta',
  'injective-mainnet': 'injective',
  'solana-mainnet-beta': 'solana',
}

// For slugs shared by multiple networks, the registry `id` whose page and metadata render.
export const slugCanonicalId: Record<string, string> = {
  solana: 'solana-mainnet-beta',
}

/** The URL slug for a network's Supported Networks page. */
export function getNetworkSlug(id: string): string {
  return networkSlugs[id] ?? id
}

/** Resolve a URL slug back to the registry network `id` that should render. */
export function resolveSlugToNetworkId(slug: string): string {
  if (slugCanonicalId[slug]) return slugCanonicalId[slug]
  for (const [id, mapped] of Object.entries(networkSlugs)) {
    if (mapped === slug) return id
  }
  return slug
}
