import { type ReactNode } from 'react'

import { ExperimentalButton } from '@edgeandnode/gds'
import { ArrowUpRight } from '@edgeandnode/gds/icons'

import { Heading } from '@/components'

import { useCurrentNetwork } from './NetworkContext'

const SUBGRAPH_STUDIO_API_KEYS_URL = 'https://thegraph.com/studio/apikeys/'
const SUBSTREAMS_KEY_PROVIDERS = [
  { match: 'streamingfast.io', href: 'https://thegraph.market/' },
  { match: 'pinax.network', href: 'https://app.pinax.network/' },
]

type Product = 'subgraphs' | 'substreams'

/**
 * "Get API Key" call to action for a network page's Subgraphs or Substreams section.
 *
 * - `subgraphs` links to the API Keys page in Subgraph Studio.
 * - `substreams` links to The Graph Market, the preferred provider. Networks the registry lists
 *   without a The Graph Market endpoint fall back to Pinax Network, since a The Graph Market key
 *   would not stream that network.
 */
export function GetApiKeyButton({ product }: { product: Product }) {
  const network = useCurrentNetwork()
  const href =
    product === 'subgraphs'
      ? SUBGRAPH_STUDIO_API_KEYS_URL
      : (SUBSTREAMS_KEY_PROVIDERS.find((provider) =>
          (network?.services.substreams ?? []).some((url) => url.includes(provider.match)),
        )?.href ?? 'https://thegraph.market/')

  return (
    <span className="graph-docs-not-markdown shrink-0">
      <ExperimentalButton
        variant="primary"
        size="large"
        href={href}
        target="_blank"
        iconAfter={<ArrowUpRight alt="" />}
      >
        Get API Key
      </ExperimentalButton>
    </span>
  )
}

const GRAPH_EXPLORER_URL = 'https://thegraph.com/explorer/'

/**
 * A markdown-styled `h2` with a call-to-action button beside it. The heading keeps the standard
 * `h2` styling and anchor link; on narrow screens the button wraps below the heading.
 */
function SectionHeadingWithButton({ id, title, button }: { id: string; title: ReactNode; button: ReactNode }) {
  return (
    <div className="mb-8 mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <Heading.H2 id={id} className="relative m-0">
        {title}
      </Heading.H2>
      {button}
    </div>
  )
}

/** "Indexing {Chain} with Subgraphs/Substreams" section heading with a "Get API Key" button beside it. */
export function ProductSectionHeading({ product, id, title }: { product: Product; id: string; title: ReactNode }) {
  return <SectionHeadingWithButton id={id} title={title} button={<GetApiKeyButton product={product} />} />
}

/** "Find Existing Subgraphs on {Chain}" section heading with an "Explore" button linking to Graph Explorer. */
export function ExploreSectionHeading({ id, title }: { id: string; title: ReactNode }) {
  return (
    <SectionHeadingWithButton
      id={id}
      title={title}
      button={
        <span className="graph-docs-not-markdown shrink-0">
          <ExperimentalButton
            variant="primary"
            size="large"
            href={GRAPH_EXPLORER_URL}
            target="_blank"
            iconAfter={<ArrowUpRight alt="" />}
          >
            Explore
          </ExperimentalButton>
        </span>
      }
    />
  )
}
