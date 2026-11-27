## Summary

Updates the Subgraph docs, and the Subgraph Gateway docs that depend on them, for a network served by multiple Gateway Providers. The developer flow stays build → publish → query:

- Subgraph Studio works for every developer, whichever gateway they query through. Studio API keys and billing apply only to The Graph Foundation's Gateway, which stays the labeled default.
- A new **Gateway Providers** section explains how to choose and switch providers. Published Subgraphs live onchain, so switching gateways needs only a new endpoint and API key, not a republish.
- The Subgraph Studio provider pages, Using Subgraph Studio, x402 Payments and the Upgrade Indexer move into a **Graph Foundation** section under Gateway Providers. Every old URL redirects.
- The Subgraph Gateway docs (Gateway Software) gain a **Collaboration Framework** page, and **Tracking QoS** is rewritten around publishing per-Indexer QoS data.
- Network pages, the homepage card, the glossary and the sidebar are updated to match.

127 files change in total. 58 of them are per-chain network partials with one-line link updates.

## How to review

The PR is split into six commits that each build on their own. Reviewing commit by commit in the **Commits** tab is much easier than reading the combined diff.

| # | Commit | What to check |
| --- | --- | --- |
| 1 | Move Subgraph Studio pages into a Graph Foundation provider section | **Paths only.** Pages move with their content unchanged (the renames show 95–100% similarity). Check the `nginx.conf` redirects, the sidebar `_meta` files, the route lockfile, and links to the moved pages, including the 58 network partials. No wording changes here. |
| 2 | Add Gateway Providers overview and rewrite the Graph Foundation section | The new Providers overview (Choosing a Gateway, Standards and Differences tables, Switching Gateway Providers). The Foundation Gateway overview, rewritten to the provider-page template, with billing merged in. Subgraph Studio, restructured to follow the Quick Start. The GraphOps provider page. Edits to Billing & API Keys, Fair Use, FAQs, x402 and Upgrade Indexer. |
| 3 | Update the Subgraph developer flow for multiple Gateway Providers | Subgraphs overview, Quick Start, the Developing intro (now "Subgraph Development Deep Dive"), the new Testing and Staging page, Publishing, the Querying pages, and small edits across Best Practices, Public Subgraphs and MCP pages. |
| 4 | Update network pages, homepage card and sidebar order | Network pages: chains not marked Studio-only show "API Keys: Choose a Gateway Provider" and one **Choose Provider** button. Studio-only chains keep **Get API Key** to Subgraph Studio. Also the homepage "Get an API Key" card, and AI Tooling moved to sit above Resources. |
| 5 | Update Subgraph Gateway docs for multiple Gateway Operators | The new Collaboration Framework page (Enablement, Endorsement and Expansion tiers, and transparency data). Tracking QoS, rewritten. Gateway in a Box credit and repos, plus correctness fixes across the consumer-side and component pages. |
| 6 | Regroup the glossary and update resources pages | Glossary in Protocol, Developer and Indexer sections, alphabetized, with Graph Horizon and Substreams terms added. Getting GRT gains the Studio billing wallet steps. One-line edits elsewhere. |

### Naming used throughout

- **The Graph Foundation's Gateway** (or "the Foundation's Gateway") for `gateway.thegraph.com`.
- **Gateway Provider** in the Subgraphs docs, and **Gateway Operator** in the Gateway Software docs. The glossary entry is "Gateway Operator/Provider".
- Individual providers are named only under `subgraphs/providers/`.

## Testing

- `pnpm build` passes at every commit.
- Every internal link and anchor in the built site (208 pages, about 5,900 links) was checked against the generated HTML.
- Redirects live in `nginx.conf`, so they don't run under `pnpm dev`. Test them on the PR preview or with `pnpm docker:build && pnpm docker:up`:

| Old URL | Should land on |
| --- | --- |
| `/docs/en/subgraphs/providers/subgraph-studio/introduction/` | `/docs/en/subgraphs/providers/graph-foundation/overview/` |
| `/docs/en/subgraphs/billing/` | `/docs/en/subgraphs/providers/graph-foundation/overview/` |
| `/docs/en/subgraphs/developing/deploying-publishing/using-subgraph-studio/` | `/docs/en/subgraphs/providers/graph-foundation/subgraph-studio/` |
| `/docs/en/subgraphs/providers/subgraph-studio/managing-api-keys/` | `/docs/en/subgraphs/providers/graph-foundation/managing-api-keys/` |
| `/docs/en/subgraphs/providers/subgraph-studio/upgrade-indexer/` | `/docs/en/subgraphs/providers/graph-foundation/upgrade-indexer/` |
| `/docs/en/subgraphs/tooling/x402-payments/` | `/docs/en/subgraphs/providers/graph-foundation/x402-payments/` |
| `/docs/en/subgraphs/querying/choosing-a-gateway/` | `/docs/en/subgraphs/providers/overview/#choosing-a-gateway` |

Old redirect rules that pointed at moved pages now point straight at the new pages, so nothing chains. Old billing anchors, such as `#adding-grt-using-a-wallet`, forward to the matching sections of Getting GRT.

### Already broken on `main`, not changed here

- Two links inside the graph-ts and graph-client README pages, which are pulled in from other repos.
- Four homepage chain links that use registry IDs instead of page slugs: `btc`, `eos`, `injective-mainnet`, `solana-mainnet-beta`.
- `/token-api/quick-start/` on The Graph Market page.
- `route-lockfile.txt` was already missing the other Gateway Software routes and Rewards Eligibility. This PR adds only the routes it creates or moves.

## Related

- The GraphOps provider page comes from #1133 by @chriswessels, so #1133 will conflict once this merges. Its "canonical gateway" wording is removed in #1133's second commit. That follow-up still needs applying to this copy.

## Follow-ups (not in this PR)

- A provider page for Ormi Labs. Its card currently links to ormilabs.com.
- Tracking QoS documents the proposed Gateway Indexer QoS API as drafted. Two points need confirming:
  - **Credentials:** the API needs a bearer token, but Endorsement's transparency data calls for no credentials.
  - **Deployment ID format:** the API uses `0x` hex IDs, but Endorsement's transparency data calls for `Qm…` IDs.
- Several Gateway Software pages still call Titorelli optional.
- Three glossary entries (Slashing, Allocation, Delegation Capacity) describe pre-Horizon rules.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01HpT75tdqaGiVtnx3HJJafu
