## Summary

Consolidates curation into a single source of truth, splits token how-tos out of the Subgraph Studio billing page, and tidies Resources and Subgraphs navigation. All moved pages get redirects.

### New pages

- **Resources > Getting GRT** (`/resources/getting-grt/`): how to get GRT on Coinbase, Binance, or Uniswap, plus ETH for gas. Written for Delegators, Indexers, Subgraph developers, and token holders.
- **Resources > Bridging GRT** (`/resources/bridging-grt/`): background on Ethereum → Arbitrum One, how to bridge in each direction, and FAQs.

### Curation consolidated

- Curation now lives at **Subgraphs > Developing > Curating** (`/subgraphs/developing/curating/`, page title "Subgraph Curation"). This is the only page that states curation numbers:
  - Signal table: 500 GRT (select community-supported networks), 1,000 GRT (minimum on networks with rewards), 3,000 GRT (3+ Indexers), 10,000 GRT (robust multi-Indexer support)
  - **3% curation tax** ([forum announcement](https://forum.thegraph.com/t/curation-burns-will-rise-from-1-to-3-this-week/7148)) on deposits and migrations, with no tax on withdrawals
- Removed conflicting or duplicated curation details from about 15 pages. They now link to the curation page instead:
  - Recommended signal was listed as 3,000, 1,000/500, and 1k/5k/10k GRT on different pages
  - Explorer described a "bonding curve"
  - Withdrawals were described as taxed, and two different migration rates were given
  - Pages disagreed about what happens to signal when a Subgraph is deleted
- Clarified that publishing does **not** require signal, but that Indexers may not sync a Subgraph without it.

### Other content fixes

- Subgraph Studio billing page: replaced the moved sections with a short "Your GRT Must Be on Arbitrum One" section, added billing FAQs that link to the new pages, and fixed step numbering in the multisig steps.
- Tokenomics and Glossary now match Graph Horizon: no delegation tax, 28-day undelegation period.
- New FAQ entries in Studio FAQ and Developer FAQ link to Getting GRT and Bridging GRT.

### Navigation and title changes

- Delegating moved to the top level of Resources, and the "Additional Roles" folder is removed.
- "The Graph vs. Self Hosting" is renamed "The Graph Network vs. Self Hosting" and moved to Guides & Best Practices, before Transfer to The Graph.
- Developer FAQ: the page title is now "Subgraph Developer FAQ" (nav unchanged), the section headings are renamed, and the curation question moved to the curation page.
- Page titles are now "Subgraphs Overview" and "Subgraphs Quick Start" (nav unchanged). The Cana CLI page's nav label is now "Smart Contract Analysis".

### Redirects

nginx (301):

| From | To |
| --- | --- |
| `/resources/roles/curating/`, `/curating/`, `/network/curating/` | `/subgraphs/developing/curating/` |
| `/resources/benefits/`, `/network/benefits/` | `/subgraphs/best-practices/benefits/` |
| `/resources/roles/`, `/resources/roles/delegating/`, `/resources/roles/delegating/delegating/`, `/delegating/`, `/network/delegating/` | `/resources/delegating/delegating/` |
| `/resources/roles/delegating/undelegating/` | `/resources/delegating/undelegating/` |

Client-side: URL fragments never reach nginx, so these use a new `<HashRedirect>` MDX component on `/subgraphs/providers/subgraph-studio/introduction/`:

| From                           | To                                      |
| ------------------------------ | --------------------------------------- |
| `#getting-grt`                 | `/resources/getting-grt/`               |
| `#getting-ether`               | `/resources/getting-grt/#getting-ether` |
| `#grt-on-arbitrum-or-ethereum` | `/resources/bridging-grt/`              |

## Test plan

- [ ] Preview build renders `/resources/getting-grt/`, `/resources/bridging-grt/`, `/subgraphs/developing/curating/`, `/resources/delegating/delegating/`, `/subgraphs/best-practices/benefits/`
- [ ] Sidebar: Resources shows Getting GRT, Bridging GRT, and Delegating (no Additional Roles). Developing shows Curating after Deploying/Publishing. Guides & Best Practices shows The Graph Network vs. Self Hosting second to last.
- [ ] Visiting `/subgraphs/providers/subgraph-studio/introduction/#getting-grt` (and the other two anchors) redirects correctly
- [ ] nginx redirects resolve on staging
- [ ] Confirm the Subgraph owner's share of the 3% tax on auto-migrating signal (the docs say "part of")
- [ ] Settle the deleted-Subgraph wording: Deleting a Subgraph says the owner's signal is returned automatically, while Curating says GRT is not returned automatically

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01HpT75s8N1pkWJQzEydBAKq
