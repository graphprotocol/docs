# Indexer Software — docs draft

Draft of the **Indexer Software** documentation section, structured to slot into the docs site under `indexing/`. Every page is grounded in the source repos now consolidated under `graph-gtm-kit/context/indexer-software/` (`indexer`, `indexer-rs`, `graph-node`, `graphprotocol-mainnet-docker`, `graphprotocol-testnet-docker`).

This folder mirrors the site's Nextra conventions (`_meta.js` for ordering, `_meta-titles.json` for folder titles, MDX pages with `title` / `sidebarTitle` frontmatter), so it can be moved into `website/src/pages/en/indexing/indexer-software/` as-is.

## Structure

```
indexer-software/                        "Indexer Software"
├── overview                             3-part stack (agent + service-rs + tap-agent), architecture, Horizon
├── install-and-run                      Install/run all components, shared DB, multi-network, testnet
├── deployment/                          "Deploy the Stack"
│   ├── overview                         What the Docker stack includes + flow
│   ├── mainnet-docker                   Full mainnet (Arbitrum One) Docker deployment
│   └── testnet-docker                   Testnet (Arbitrum Sepolia) Docker deployment
├── allocations/                         "Managing Allocations"
│   ├── overview                         Three methods + automatic rule updates
│   ├── operation-modes                  AUTO / OVERSIGHT / MANUAL + reconciliation loop
│   ├── indexing-rules                   decisionBasis, thresholds, examples
│   ├── action-queue                     Queue, statuses, GraphQL API, integrations
│   └── direct-commands                  Immediate allocation ops
├── managing-provisions                  Horizon provisions (renamed from "Managing Your Provision")
├── graphtally                           GraphTally & Query Fees — receipt→RAV flow, redemption, addresses
├── cost-models                          Agora cost models
├── dispute-monitoring                   POI dispute monitoring
├── auto-graft                           Grafted-subgraph dependency automation
├── subgraph-freshness                   Freshness checker + tuning
├── reference/                           "Reference"
│   ├── agent-configuration              Full agent flag tables (TS indexer-agent)
│   ├── service-tap-configuration        indexer-service-rs / indexer-tap-agent TOML + routes
│   ├── cli-reference                    Full CLI command listing
│   ├── network-configuration            Mainnet/testnet networks + onboarding
│   ├── feature-support-matrix           GIP-0008 matrix
│   └── error-codes                      IE001–IE071
└── troubleshooting                      Common issues → fixes
```

## Source mapping

| Draft page | Source (under `context/`) |
| --- | --- |
| overview | `indexer/README.md`, `indexer/CLAUDE.md` |
| install-and-run | `indexer/README.md`, `indexer/docs/testnet-setup.md` |
| deployment/* | `indexer-software/graphprotocol-mainnet-docker/*`, `.../graphprotocol-testnet-docker/*` |
| allocations/overview | `indexer/docs/allocation-management/README.md` |
| allocations/operation-modes | `indexer/docs/operation-modes.md` |
| allocations/indexing-rules | `indexer/docs/allocation-management/rules.md` |
| allocations/action-queue | `indexer/docs/allocation-management/action-queue.md` |
| allocations/direct-commands | `indexer/docs/allocation-management/direct.md` |
| managing-provisions | `indexer/docs/provision-management.md` |
| graphtally | `indexer-software/graph-tally/graph-tally-docs.md`, `.../graph-tally-indexer-micropayments.md`, `indexer-rs/README.md` |
| cost-models | `indexer/packages/indexer-cli/README.md` (cost commands) |
| dispute-monitoring | `indexer/packages/indexer-cli/README.md` (disputes), agent disputes flags |
| auto-graft | `indexer/docs/auto-graft.md` |
| subgraph-freshness | `indexer/docs/subgraph-freshness.md` |
| reference/agent-configuration | `indexer/packages/indexer-agent/README.md` |
| reference/service-tap-configuration | `indexer-rs/README.md`, `indexer-rs/docs/Routes.md`, `graph-tally/graph-tally-docs.md` |
| reference/cli-reference | `indexer/packages/indexer-cli/README.md` |
| reference/network-configuration | `indexer/docs/networks.md`, `.../testnet-setup.md` |
| reference/feature-support-matrix | `indexer/docs/feature-support-matrix.md` |
| reference/error-codes | `indexer/docs/errors.md` |

## Slotting into the live docs

Move this folder to `website/src/pages/en/indexing/indexer-software/`, then register it in `indexing/_meta.js` and `indexing/_meta-titles.json`:

```js
// indexing/_meta.js — add the entry where it should appear in the sidebar
'indexer-software': titles['indexer-software'] ?? '',
```

```json
// indexing/_meta-titles.json
{
  "tooling": "Indexer Tooling",
  "indexer-software": "Indexer Software"
}
```

## Open items / editorial notes

- **Overlap with the live `/indexing/tap/` page:** the new `graphtally.mdx` is the operational query-fee guide for this section and draws on the same source as the live "GraphTally for Indexers" page. Decide whether this section's page consolidates/replaces `/indexing/tap/` or links to it (current draft links to it as the protocol-level guide).
- **Three-part stack:** Overview, Install and Run, and GraphTally now reflect `indexer-agent` (TS) + `indexer-service-rs` + `indexer-tap-agent` (Rust) sharing one database. The `deployment/*` pages still describe the community Compose stacks, which may package the legacy TS `indexer-service` — reconcile the service layer when finalizing.
- **v2.0.0 / Horizon:** service-rs and tap-agent v2.0.0+ require Horizon and drop V1 receipts; re-verify version gating and contract addresses against the live blockchain-addresses table at publish time.
- **Community Docker stacks:** the `deployment/*` pages document the StakeSquid mainnet/testnet Compose repos. Confirm whether these should be presented as first-party docs, framed as community-maintained (current framing), or linked out only.
- **Chain support:** `reference/feature-support-matrix` and `network-configuration` defer to the canonical Supported Networks source rather than asserting counts — verify links against the live site before publishing.
- **`present-poi` / `resize` / provisions** are marked Horizon-only throughout; re-check against the protocol status at publish time.
- **Error codes** IE037–IE040 are undocumented in source (marked reserved); fill in if descriptions exist upstream.
- Cross-links use `/indexing/indexer-software/...` paths assuming the folder lands under `indexing/`. Update if the final home differs.
