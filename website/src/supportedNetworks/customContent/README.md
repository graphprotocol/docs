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
