# Foundation Gateway Docs: Seed

This folder seeds a new chat that will update the Subgraph Gateway docs (`website/src/pages/en/gateways/subgraphs/**`) to reflect The Graph Foundation's multi-gateway strategy: the Foundation runs the canonical gateway, and other teams can run gateways on the same open rails with tiered support (Enablement, Endorsement, Expansion).

## Status

- **Oct 16, 2026:** Plan drafted against branch `multi-gateway-1026`, from the internal _Multi-Gateway Subgraph Strategy_ memo (Notion, Oct 16). It has not been executed: that branch has no commits beyond `main`.
- **Nov 20, 2026:** Quick check against `main` @ `8aabd7d2`:
  - The gateway section's page structure is unchanged (same 21 pages; no `working-with-the-foundation` page yet). Only two commits since Oct 16 touched it: #1131 (curation consolidation, Getting/Bridging GRT) and #1127 (Supported Networks sync).
  - Every issue the plan flags is still live on `main`: Studio-issued API key claims (`components/overview.mdx:39`, `components/operating-a-gateway.mdx:54`, `consumer-side/serving-queries.mdx:39`), the dedicated-Discord-channel promise (`consumer-side/customer-support.mdx:13`), the Edge & Node attributions (`consumer-side/pricing-payments.mdx:22`, `supply-side/tracking-qos.mdx:53`), and the absolute Upgrade Indexer link (`consumer-side/indexing-approaches.mdx:29`).
  - The Upgrade Indexer and Fair Use Policy still live under `subgraphs/providers/subgraph-studio/`.
  - Paths elsewhere in the docs have moved since October (for example, `guides/` became `best-practices/`, and getting-GRT content moved to `resources/`). Re-check any path in `plan.md` outside the gateway section before using it.

## Before you start the new chat

Several policies and decisions have changed since Oct 16. Re-read the current strategy memo and check each item below rather than trusting `plan.md`:

- The **disclosure rules** (what to publish vs. keep internal) in `plan.md`. These were derived from the Oct 16 memo.
- Whether the **Endorsement criteria** (QoS thresholds, brand guidelines) have been approved by the Council.
- Whether the **Foundation has taken over** Studio, Explorer, the QoS Oracle submitter and Fair Use enforcement from Edge & Node, and how that should be worded publicly.
- The **seven open decisions** at the end of `plan.md`.
- How this plan interacts with `../provider-neutral/`: the "Conflicts" section of `plan.md` says the provider-neutral plan's open directory, Edge & Node operator naming and "drop canonical" item contradict the Oct 16 strategy.

## Files

| File | What it is |
| --- | --- |
| `plan.md` | The Oct 16 plan: goal, disclosure rules (publish vs. keep internal), conflicts with the provider-neutral plan, page-by-page changes, phasing, open decisions. |

## Related

- Source memo: _Multi-Gateway Subgraph Strategy_ (Notion, Internal Strategy Memos). It is internal; do not copy its revenue, fee, referral or support-budget details into the docs.
- `../provider-neutral/`: the companion Subgraph docs rewrite seed.
- Project docs: `claude/multi-gateway-gateway-docs-plan.md` (same content as `plan.md`), `claude/provider-neutral-subgraph-docs-plan.md`.
