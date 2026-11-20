# Prompt: Provider-Neutral Subgraph Docs

You're working in The Graph's docs repo (`docs`, connected on my computer), on the **`multi-gateway-subgraph-docs`** branch. Make every change on that branch. Your job is to rewrite the Subgraph docs, plus the parts of the Subgraph Gateway docs they depend on, so they reflect a network with multiple Gateway Operators. The developer flow must stay simple: build → publish → query.

## The situation (all settled; write it as current fact)

1. **The Graph Foundation operates the canonical gateway**: the gateway at `gateway.thegraph.com`, together with Subgraph Studio and Graph Explorer under thegraph.com. It stays the default path on Foundation surfaces, including these docs.
2. **Other Gateway Operators also serve The Graph Network.** Two independent Gateway Operators are launching and have reached the Endorse tier. Each will get a dedicated page under `subgraphs/providers/`.
3. **Subgraph Studio works for every developer, whichever gateway they query through.** Anyone can use Studio to create Subgraphs, deploy, manage versions and publish to the network without querying through the canonical gateway. Studio API keys and Studio billing (GRT or credit card) apply to the canonical gateway only. A developer who queries through another Gateway Operator gets keys and billing from that operator.
4. **Published Subgraphs live onchain, so any gateway can serve any of them.** Switching gateways means a new endpoint and API key. There's no need to republish.

## How the docs should read

- **Keep one clear happy path.** Overview, Quick Start, Developing and Querying walk the developer through the canonical gateway as the labeled default: Studio for deploy and publish, a Studio API key, and `gateway.thegraph.com` in examples. At the points where the gateway matters (getting an API key, the query endpoint, pricing), add a short, consistent note that multiple Gateway Operators serve every published Subgraph, linking to the Providers overview.
- **Separate what's universal from what depends on the provider.**
  - Universal: Subgraph code, Graph CLI, onchain publishing, curation signal, Subgraph and Deployment IDs, the GraphQL API.
  - Provider-specific: API keys, billing and pricing, rate limits, staging environments, support.
- **Only name individual Gateway Operators in `subgraphs/providers/`.** Everywhere else, say "multiple Gateway Operators" and link to `/subgraphs/providers/overview/`. This keeps operator-specific details from spreading through the docs and going stale.
- **Pricing numbers** (free tier, plan names, $/query) appear only on provider pages. Link to live pricing pages rather than hardcoding figures.
- **Label the Foundation's products as Foundation-operated**, so readers can tell the canonical gateway from a third-party one. Don't describe other operators as "official," "certified," "partner," or "exclusive," and don't imply the Foundation guarantees their service.

## Target structure (refine it; don't treat it as fixed)

```
subgraphs/providers/
  overview            NEW  Providers: what a Gateway Operator does; what's universal vs provider-specific;
                           what to compare; switching; the canonical gateway; a list of every
                           Endorsed Gateway Operator linking to its page
  subgraph-studio/    Studio as a tool for every developer (deploy, versions, publish), plus
                      canonical-gateway API keys and billing. Split the current "introduction" into
                      overview + billing.
  graphops.mdx        Already drafted in PR #1133 (see below). Bring it in; don't rewrite it.
  <operator-slug>.mdx One flat page per Endorsed Gateway Operator, using the GraphOps page's structure
                      as the template.
```

**The GraphOps page already exists as a draft:** https://github.com/graphprotocol/docs/pull/1133 (one commit adding `subgraphs/providers/graphops.mdx`, a `providers/_meta.js` entry and a `route-lockfile.txt` line). Fetch it with `git fetch origin pull/1133/head`.
- Use its layout as the template for every operator page: frontmatter, an independence note, an Overview table, About, How it works, Pricing, and so on.
- Don't edit its operator-supplied facts, pricing, links or UTM parameters. Only change links or wording where they must match the new structure, and list any such changes for me.
- It already links to `/subgraphs/providers/overview/` and to the Studio introduction page. Make sure the Providers overview exists at that path, and update the Studio link if that page moves or splits.

Also:
- Move the Upgrade Indexer out of the Studio folder; it's a Foundation-operated Indexer, not a Studio feature.
- Replace the Studio-only deploy page with a neutral testing and staging page.
- Make publishing protocol-first: describe the onchain action, then the ways to do it (CLI, Studio).
- Rewrite the querying pages around: find a Subgraph → choose a gateway → get credentials → query.

## Gateway section (same branch)

Apply the correctness fixes from the foundation-gateway seed:
- Remove claims that third-party gateways can use Studio-issued API keys.
- Change Edge & Node attributions to the Foundation (pricing reference, QoS Oracle).
- Remove the promise of a dedicated Foundation Discord support channel.
- Fix the absolute Upgrade Indexer link.
- Add a public "Working with The Graph Foundation" page for incoming operators.

**One override:** that seed says Endorsement includes no Docs listing. That's no longer true. Endorsed operators get a provider page and a listing on the Providers overview, as described above.

## Sources (read all of these before planning)

1. `drafts/docs-updates/provider-neutral/`: `README.md`, `plan.md`, `audit-2026-11-20.md`, `studio-mentions-raw.txt`. Re-run the audit command in the audit file against current `main`, because paths may have moved again.
2. `drafts/docs-updates/foundation-gateway/`: `README.md` and `plan.md`. Pay close attention to its "Disclosure rules" (publish vs keep internal), and apply its "Conflicts" section along with the override above.
3. Notion policy docs (internal; source material only, never cite or link them in the docs):
   - Provider Collaboration Framework v0.2: https://app.notion.com/p/409b6eecd5798098988fe91d4da716b3
   - [GTM] Subgraph Multi-Gateway Strategy: https://app.notion.com/p/3f3b6eecd57980e3aa99fe0919bdca71
   - Gateway QoS Endorsement v0.2: https://app.notion.com/p/416b6eecd57980fc9b11c39196269e09
   - Powered by The Graph Branding v0.2: https://app.notion.com/p/405b6eecd57980d78dbbf29b7433f844

## Public-facing only: what must not reach the docs

These docs are public. Write only what a developer or Gateway Operator needs, stated as settled fact. Don't publish, paraphrase or hint at:

- **Money:**
  - revenue goals or profit motive for the canonical gateway
  - operator-fee percentages or sizing
  - listing fees, revenue shares, referral terms
  - fallback as a paid service
  - use of revenue, buybacks
  - financial modeling
- **Strategic reasoning:**
  - why the Foundation runs a gateway (leverage, "handcuffing," price discipline)
  - the flagship-placement exception
  - operator segmentation
  - Data Collection / Use-Case APIs as a business line
- **Internal process:**
  - names of Foundation staff or DRIs
  - Council deliberations or reviewer feedback
  - "design partners," internal phase names ("Phase 1/2"), document versions ("v0.2")
  - "not final / not legally reviewed" caveats
  - Slack channels, support-hour budgets
  - Notion links
- **Unannounced change:** Studio staging deprecation. Describe staging as it works today, and structure the docs so staging doesn't depend on Studio.
- **Unresolved debate:** anything marked TBD, open, proposed or under review in the source docs. If a page needs one of those facts, leave it out and add it to your question list. Don't invent placeholder policy.
- **Change-log narration:** "Previously Edge & Node…", "We are moving toward…", "As of the new strategy…". State what is true now. Don't describe the docs or the ecosystem as being in transition.
- **Repo artifacts:** never reference `drafts/`, the plan files, audit tiers or open-decision numbers in published pages. Don't commit the `drafts/` folder.

## How to work

1. **Ask before planning.** Read every source and check repo state: `git status`, the current branch, and recent commits on `main`. Then ask me the questions you need answered before planning, in one batch. At minimum:
   - whether to fold PR #1133's commit into `multi-gateway-subgraph-docs` (cherry-pick) or merge #1133 into `main` first and rebase onto it
   - the facts for the second Gateway Operator's page (name, slug, docs URLs, chains, payment methods, auth, pricing, support) in the same shape as the GraphOps page, or whether to ship it as a stub
   - whether to publish Endorsement criteria publicly now, and at what level of detail
   - the public intake channel for prospective Gateway Operators
   - who operates and enforces the Fair Use Policy, and whether the Foundation now runs the QoS Oracle submitter
   - the public term for the Foundation's gateway on developer pages: "the canonical gateway," "The Graph Foundation's gateway," or a product name
2. **Branch:** check out `multi-gateway-subgraph-docs`. If it's behind `main`, ask before rebasing or merging.
3. **Plan.** Propose a page-by-page plan (new, moved, rewritten, light-touch), with the redirects (`nginx.conf`, `website/route-lockfile.txt`) and component changes (`GetApiKeyButton.tsx`, `NetworkDetailsPage.tsx`, `ResourceCards.tsx`, `HomePage.tsx`, `index.json`). **Wait for my approval before writing.**
4. **Write in stages:** Providers overview and Studio pages first, then the happy-path pages (Overview, Quick Start, Publishing, Querying), then the long tail, then the gateway section. Follow existing repo conventions ("Subgraph" capitalized, "onchain," existing frontmatter and `_meta.js` patterns). Keep the Quick Start's existing Start Block and Troubleshooting sections.
5. **Check before handing back:**
   - Build the site and fix broken links.
   - Grep the changed files for leaked terms: fee percentages, "revenue," "Phase 1," "design partner," "v0.2," staff names, "Edge & Node" (except where historically accurate), "TBD," "notion.so," "drafts/".
   - Read each happy-path page top to bottom as a new developer would, to confirm the flow still works without detours.
   - Have a separate agent that hasn't seen your drafts review the diff for internal leakage and for any naming of individual operators outside `subgraphs/providers/`.
6. **Hand back** a summary of what changed and the questions that are still open. Commit only when I ask.
