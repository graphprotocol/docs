# Provider-Neutral Subgraph Docs — Rewrite Plan

Branch: `provider-neutral-subgraph-docs` (docs repo) · Drafted Oct 9, 2026 · Not yet executed

> **Snapshot as drafted on Oct 9, 2026.** Some paths have moved on `main` since then (for example, `guides/` became `best-practices/`, and the getting-GRT content moved to `resources/`). See `audit-2026-11-20.md` for the current state and `README.md` for what changed.

## Goal

Restructure the Subgraph docs so that Subgraph Studio is presented as one provider among several, not as the default gateway, pricing model or workflow. The protocol path (build → publish onchain → get indexed → query through a gateway) is the backbone. Provider-specific steps (API keys, billing, staging, publishing UI) live under `subgraphs/providers/`.

Audiences:

- **Developers**: learn what's the same everywhere and what to compare when choosing a provider.
- **Incoming gateway teams**: a clear, equal slot to be listed in.
- **Graph Council**: visible evidence of a move toward provider-neutral framing.

## What the audit found

About 45 English pages mention Studio. The bias is structural, not just a matter of wording:

1. **The default path runs through Studio.** The overview lifecycle, Quick Start (steps 1, 3, 6 and 7), Developing intro, and Deploy/Publish pages all start with "create a Subgraph in Studio."
2. **Studio's pricing reads like network pricing.** "100,000 free queries/month," "Free/Growth Plan," and "pay with GRT or credit card" appear on overview, quick-start, querying/introduction, resources/benefits and resources/tokenomics.
3. **Getting an API key means using Studio.** This shows up in querying/introduction, the MCP setup pages (Claude, Cline, Cursor), secure-api-keys-nextjs, polymarket, agent0, x402-payments, install-the-cli and developer-faq.
4. **All code samples hardcode `gateway.thegraph.com`** with no label saying which operator runs it.
5. **The providers folder contains only Studio.** `subgraphs/providers/` has one child, and the Studio "Overview" page is really a billing and buy-GRT guide.
6. **Network-level things are filed under Studio.** The Upgrade Indexer (Foundation-operated) sits at `providers/subgraph-studio/upgrade-indexer`. The Studio archive policy sits in `multiple-networks.mdx`.
7. **The same bias appears outside the subgraphs section.**
   - The homepage has a "Studio Billing" card (`index.json`, `ResourceCards.tsx`) and a `HomePage.tsx` API-keys link.
   - The supported-networks legend has a "Subgraph Studio only" tier, and `NetworkDetailsPage.tsx` shows "Subgraph Studio (API Keys)."
   - In networks-registry, `services.subgraphs[].kind` takes `gateway | studio | backstop | curation`, so a product name is baked into the schema. Every gateway entry is described as "The Graph's _canonical_ Subgraph gateway."
8. **Several links are already broken or legacy.** Examples: `/developing/creating-a-subgraph/`, `/deploying/deploying-a-subgraph-to-studio/` and `/deploying/subgraph-studio/#testing…` in overview and publishing; `/subgraphs/cookbook/...` anchors in transfer-to-the-graph; a relative `developing/publishing/...` link in quick-start.

Precedent: Substreams already uses `substreams/providers/the-graph-market`. Subgraphs should follow the same model.

## Proposed information architecture

```
subgraphs/
  overview                      REWRITE  neutral lifecycle
  quick-start                   REWRITE  neutral steps + "pick a provider" step
  providers/
    overview  (Choosing a Provider)   NEW
    subgraph-studio/
      overview                  NEW      what Studio offers today
      deploying-to-studio       MOVED    from developing/deploying-publishing/using-subgraph-studio
      managing-api-keys         KEEP
      billing                   RENAMED  from introduction (plans, card, GRT, getting GRT/ETH)
      fair-use-policy           KEEP     (ownership wording to confirm)
      studio-faq                KEEP     + archive policy moved in from multiple-networks
    <future-provider>/          TEMPLATE overview · API keys · billing · (deploy/staging if offered)
  developing/
    introduction                REWRITE
    creating/...                light touch
    deploying-publishing/
      testing-and-staging       NEW      local Graph Node, debug forking, provider staging envs
      publishing-a-subgraph     REWRITE  protocol-first; CLI · Studio · other provider UIs
      getting-indexed           NEW/MOVED  curation signal + Upgrade Indexer (moved out of Studio)
      multiple-networks         light touch (Studio archive section moves out)
    managing/ (transfer, delete) REWRITE  onchain action first, UIs second
  querying/
    introduction                REWRITE  find → pick gateway → credentials → query
    from-an-application         REWRITE  endpoint convention, drop "Studio endpoint" as the dev default
```

Redirects: add an `nginx.conf` rewrite for every moved path, repoint the existing rewrites that target moved pages so they don't chain, and update `website/route-lockfile.txt` (checked by `sitemap-ci.js`).

## The new "Choosing a Provider" page (`/subgraphs/providers/overview/`)

1. **What a provider is.** A gateway provider serves queries for published Subgraphs and handles authentication and billing. Some providers also offer deployment, staging, publishing UIs and version management. The protocol is permissionless, so any gateway can serve any published Subgraph.
2. **What's the same everywhere.** Subgraph code, Graph CLI, onchain publishing, Subgraph and Deployment IDs, and the GraphQL API.
3. **What to compare.** A factor checklist:
   - supported chains
   - capabilities (query-only, deploy/staging, publish UI, version management)
   - payment methods (GRT, card, USDC/x402)
   - pricing model and free tier
   - auth and key controls (domain or Subgraph restriction, spend caps)
   - staging environments and log access
   - SLAs and support channels
   - QoS and Indexer selection approach
4. **Guidance by situation.** Hobbyist or hackathon, production dapp, enterprise with an SLA, AI agent (x402), team publishing from a multisig.
5. **Portability.** Switching providers means changing the endpoint and key. You never need to republish.
6. **Provider directory.** Same template for every provider, ordered alphabetically, no "recommended" badges. Each listing is self-reported and links to the provider's own docs, with a "last verified" date.
7. **Getting listed.** Inclusion criteria and the PR process, also documented in CONTRIBUTING. This is the page the Foundation can send to incoming gateway teams.
8. **Run your own gateway.** Link to `/gateways/subgraphs/`.

## Editorial rules for the rewrite

- "Subgraph Studio" appears only (a) inside `providers/subgraph-studio/` and (b) as one labeled example ("e.g., Subgraph Studio") in provider lists.
- Use "gateway provider" or "your provider" generically, and add **Gateway** and **Gateway provider** to the glossary.
- Describe protocol actions (publish, signal, transfer, deprecate/delete) as onchain actions first, then list the UIs that can do them.
- Put pricing numbers (free tiers, plan names, $/query) only on provider pages.
- Name operators plainly where it matters: Edge & Node for Studio and gateway.thegraph.com, and The Graph Foundation for the Upgrade Indexer.
- Use one endpoint convention for code samples (see open decision 2).

## Page-by-page scope

**Tier A — structural rewrite (8):**

- subgraphs/overview
- quick-start
- developing/introduction
- deploying-publishing/using-subgraph-studio (move, then replace with testing-and-staging)
- publishing-a-subgraph
- querying/introduction
- querying/from-an-application
- providers/subgraph-studio/introduction (split into overview + billing)

**Tier B — section rewrites (~13):**

- managing/deleting, managing/transferring
- multiple-networks (archive policy)
- developer-faq
- install-the-cli
- guides/transfer-to-the-graph
- tooling/x402-payments (label it as a gateway.thegraph.com feature)
- resources/benefits
- resources/tokenomics
- resources/glossary
- resources/roles/curating (E&N support email)
- existing-subgraphs/polymarket, existing-subgraphs/agent0

**Tier C — wording only (~14):**

- subgraph-mcp/claude, cline, cursor
- guides/secure-api-keys-nextjs, grafting, near, subgraph-debug-forking
- creating/subgraph-manifest, creating/advanced
- querying/subgraph-id-vs-deployment-id
- existing-subgraphs/explorer
- supported-networks.mdx footnote
- substreams/developing/dev-container, substreams/developing/solana/transactions

**Components and strings:**

- `index.json` "Studio Billing" card → "Providers & Pricing"
- `ResourceCards.tsx` and `HomePage.tsx` links → Choosing a Provider
- `NetworksTable` and `NetworkDetailsPage` labels

**No change needed:** gateways/* (already operator-neutral), indexing/chain-integration-overview, resources/roles/delegating/undelegating.

## Phasing

1. **Next week's PR:**
   - New information architecture and the Choosing a Provider page
   - All Tier A and Tier B pages
   - Studio content moved into its provider folder, plus the Upgrade Indexer move
   - Glossary, homepage cards, redirects and lockfile
   - Broken-link fixes
2. **Same PR if time allows, otherwise a fast follow:** the Tier C sweep and the supported-networks UI labels.
3. **When new gateways launch:**
   - Add provider pages from the template.
   - Make a networks-registry schema change: either replace the `studio` kind with something neutral (e.g. `deploy`), or keep it for backward compatibility and add a `name`/`operator` field. Allow multiple `gateway` entries per chain, and drop "canonical" from the descriptions.
   - Have network pages list providers per chain from registry data.

## Open decisions

1. **Studio staging deprecation.** Announce it in the docs now, or just make staging not depend on Studio (testing-and-staging page) and keep Studio's page factual ("staging available on N chains")?
2. **Code-sample endpoints.** Use a placeholder (`https://<GATEWAY_URL>/api/<API_KEY>/subgraphs/id/<ID>`) with a callout listing gateway hosts, or keep `gateway.thegraph.com` and label it as an example?
3. **Upgrade Indexer and Fair Use Policy.** Where should they live, and who is named as operator and enforcer? Fair Use currently mixes "Foundation's Upgrade Indexer" with "Edge & Node Support Team."
4. **Directory at launch.** Publish Choosing a Provider with only Studio listed, or wait for the first new provider? Don't name incoming teams before they launch.
5. **Quick Start default path.** Make `graph publish` (CLI) the neutral default with provider tabs for API keys, or use provider tabs throughout?
6. **Registry schema change.** Do it this cycle or in phase 3?
