import { createContext, type ReactNode, useContext } from 'react'

import { Callout } from '@/components'

import { type SupportedNetwork } from './utils'

// The network whose Supported Networks page is rendering. `NetworkDetailsPage` provides it so
// the shared custom-content partials (./customContent/_*.mdx) can branch on registry data
// instead of per-page props.
export const NetworkContext = createContext<SupportedNetwork | null>(null)

export function useCurrentNetwork(): SupportedNetwork | null {
  return useContext(NetworkContext)
}

/** Whether Subgraph Studio indexes this network (a Studio entry in `services.subgraphs`). */
function useHasStudioIndexing(): boolean {
  return useCurrentNetwork()?.subgraphsStudio ?? true
}

/** `description` of each `kind: 'backstop'` entry in the network's `services.subgraphs`. */
function useBackstopDescriptions(): string[] {
  const network = useCurrentNetwork()
  return (network?.services.subgraphs ?? []).flatMap((entry) =>
    typeof entry !== 'string' && entry.kind === 'backstop' && entry.description ? [entry.description] : [],
  )
}

/** Renders `children` when Subgraph Studio indexes the current network, `fallback` otherwise. */
export function StudioIndexing({ children, fallback = null }: { children?: ReactNode; fallback?: ReactNode }) {
  return <>{useHasStudioIndexing() ? children : fallback}</>
}

/**
 * Warning shown on networks Subgraph Studio can deploy and publish to, but does not index.
 * Adds the registry's backstop `description` (community indexing directions) when present.
 */
export function SubgraphStudioIndexingNotice({ chainName }: { chainName: string }) {
  const hasStudioIndexing = useHasStudioIndexing()
  const backstopDescriptions = useBackstopDescriptions()
  if (hasStudioIndexing) return null
  return (
    <Callout data-callout-type="warning">
      This network does not have Subgraph Studio indexing support. Publish your Subgraph to The Graph Network to get
      indexing support on {chainName}.{backstopDescriptions.length > 0 && ` ${backstopDescriptions.join(' ')}`}
    </Callout>
  )
}

/**
 * Recommended curation signal for the current network: 1,000 GRT where the network earns indexing
 * rewards (`issuanceRewards: true`), 500 GRT for community-backstop-only networks.
 */
export function RecommendedSignal() {
  return <>{useCurrentNetwork()?.issuanceRewards ? '1,000' : '500'}</>
}

/** Renders `rewards` on networks that earn indexing rewards (`issuanceRewards: true`), `otherwise` elsewhere. */
export function IndexingRewardsText({ rewards, otherwise }: { rewards: ReactNode; otherwise: ReactNode }) {
  return <>{useCurrentNetwork()?.issuanceRewards ? rewards : otherwise}</>
}

/** Renders its children unless `hide` is set; lets MDX partials make a markdown block optional per page. */
export function ShowUnless({ hide, children }: { hide?: boolean; children?: ReactNode }) {
  return <>{hide ? null : children}</>
}
