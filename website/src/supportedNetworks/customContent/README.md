# Custom content for Supported Networks pages

Each Supported Networks landing page (`/supported-networks/<id>/`) is generated from the [networks registry](https://networks-registry.thegraph.com) and rendered by `../NetworkDetailsPage.tsx`. By default every page shows the same thing: the network header, a metadata table, and a grid of generic "Guides" cards.

This folder lets a single network get **custom body content** — a tailored guide, network-specific caveats, code samples — without changing any other network's page. The content is rendered between the metadata table and the Guides cards.

## Add custom content for a network

1. Create `<id>.mdx` in this folder, where `<id>` is the network's registry id (the last path segment of its URL, e.g. `anubis` → `/supported-networks/anubis/`). Author it like any other docs page: standard Markdown, tables, code fences, and callouts via GitHub-style alert syntax:

   ```md
   > [!NOTE] A neutral, informational callout. [!TIP] A positive tip. [!IMPORTANT] Something the reader must not miss.
   ```

   Use root-relative links for internal docs (e.g. `/subgraphs/querying/introduction/`). Start headings at `##` — the network name is already an `<h2>` on the page.

2. Register it in `index.ts`:

   ```ts
   import MyNetwork from './my-network.mdx'

   export const customNetworkContent: Record<string, ComponentType> = {
     anubis: Anubis,
     'my-network': MyNetwork,
   }
   ```

Networks not listed in `index.ts` render the default templated page, unchanged.

## Notes

- The `.mdx` is compiled by Nextra's loader as a non-page import, so the same remark plugins (callouts, etc.) and MDX component styling used across the docs apply automatically — the content looks native to the site.
- The page only exists if the network is present in the **published** registry that the build fetches. Custom content here does not create the page; it only enriches a page that the registry already generates.

## Reusable content blocks

Common, repeated sections live in shared MDX partials (prefixed `_`) so a single edit updates every network that uses them. Import a partial and render it with the network-specific values as props.

### Substreams section

Two partials cover the standard "Indexing _{Chain}_ with Substreams" section for EVM networks, differing only by the block model the network is served with:

- `_substreams-extended.mdx` — **extended** EVM block model (full transaction, call, and event data). Used by chains like BSC, Polygon, Monad, Ink.
- `_substreams-base.mdx` — **base** EVM block model (block, transaction, and event/log data). Used by chains like Blast, MegaETH, TRON EVM.

```mdx
import SubstreamsExtended from './_substreams-extended.mdx'

<SubstreamsExtended chainName="BSC" title="BNB Smart Chain" />
```

Props:

- `chainName` (required) — short name used throughout the body copy (e.g. `BSC`).
- `title` (optional) — heading display name; defaults to `chainName` (e.g. `BNB Smart Chain` when `chainName` is `BSC`).
- `keyProvider` (optional) — set to `"pinax"` when the network has no The Graph Market Substreams endpoint, so step 1 sends readers to [Pinax Network](https://app.pinax.network/) for an API key instead of thegraph.market.

The provider sentence on each network page ("… via [The Graph Market] and [Pinax Network]") should list only the providers in that network's `services.substreams` entries in the registry: `streamingfast.io` → The Graph Market, `pinax.network` → Pinax Network, `data.nexus` → Data Nexus.

Non-EVM networks (Solana, Bitcoin, Injective, Stellar, etc.) use bespoke Substreams wording and keep their section inline rather than using these blocks.

### Subgraphs section

Two partials cover the standard "Indexing _{Chain}_ with Subgraphs" section for EVM networks:

- `_subgraph-community.mdx` — networks indexed on The Graph Network (indexing rewards and/or community backstop indexing). Walks readers through the Subgraph Studio UI flow: create in Studio, deploy from the CLI, publish to The Graph Network from the Studio dashboard.
- `_subgraph-studio.mdx` — networks Subgraph Studio indexes but with no guaranteed indexing on The Graph Network yet.

```mdx
import SubgraphCommunity from './_subgraph-community.mdx'

<SubgraphCommunity
  chainName="BSC"
  title="BNB Smart Chain"
  networkId="bsc"
  slug="bsc"
  explorerUrl="https://bscscan.com"
  explorerName="BscScan"
  rpcUrl="https://bsc-dataseed.bnbchain.org"
/>
```

Studio indexing support is read from the registry, not from props. `NetworkDetailsPage` provides the current network through `NetworkContext` (`../NetworkContext.tsx`), and when a network has no `kind: 'studio'` entry in `services.subgraphs`, `_subgraph-community.mdx` shows a warning to publish to The Graph Network for indexing, followed by the `description` of each `kind: 'backstop'` entry (e.g. "InfraDAO provides indexing support for all published Subgraphs with 500+ GRT in signal on Anubis Mainnet."). The curation signal recommended in the publish step is also registry-driven (`RecommendedSignal`): 1,000 GRT on networks with `issuanceRewards: true`, 500 GRT on community-only networks. Update the registry, not the page, to change any of these.

### "Get API Key" buttons

Every "Indexing _{Chain}_ with Subgraphs" and "Indexing _{Chain}_ with Substreams" section heading is a `ProductSectionHeading` (`../GetApiKeyButton.tsx`): a standard `h2` with a primary GDS "Get API Key" button beside it (the button wraps below the heading on narrow screens). Pass the heading text as `title`, not as children, so MDX doesn't wrap it in a paragraph inside the `h2`:

```mdx
import { ProductSectionHeading } from '@/supportedNetworks/GetApiKeyButton'

<ProductSectionHeading
  product="substreams"
  id="indexing-bitcoin-with-substreams"
  title="Indexing Bitcoin with Substreams"
/>
```

`product="subgraphs"` links to the Subgraph Studio API Keys page. `product="substreams"` links to The Graph Market, falling back to Pinax Network only when the registry lists no The Graph Market endpoint for the network. The shared partials already include it; add it by hand to bespoke (non-EVM) Substreams sections.
