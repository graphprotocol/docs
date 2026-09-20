import type { ComponentType } from 'react'

import Anubis from './anubis.mdx'
import Bsc from './bsc.mdx'
import Polygon from './polygon.mdx'

/**
 * Per-network custom content for Supported Networks landing pages.
 *
 * Keyed by the network `id` from the networks registry (e.g. `anubis`,
 * matching `/supported-networks/anubis/`). Each value is an MDX document,
 * authored exactly like the rest of the docs (callouts, tables, code blocks),
 * that `NetworkDetailsPage` renders below the metadata section.
 *
 * To give another network a custom landing page:
 *   1. Add `src/supportedNetworks/customContent/<id>.mdx`.
 *   2. Import it here and add it to the map below.
 * Networks not listed here render the default templated page, unchanged.
 */
export const customNetworkContent: Record<string, ComponentType> = {
  anubis: Anubis,
  bsc: Bsc,
  matic: Polygon,
}
