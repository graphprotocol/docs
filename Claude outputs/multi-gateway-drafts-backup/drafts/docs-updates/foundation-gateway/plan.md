# Gateway Docs Update Plan: Multi-Gateway Strategy

Branch: `multi-gateway-1026` (docs repo) · Drafted Oct 16, 2026 · Not yet executed · Source: _Multi-Gateway Subgraph Strategy_ memo (internal, Oct 16) Scope: `website/src/pages/en/gateways/subgraphs/**` (Overview plus the 20 child pages)

> **Snapshot as drafted on Oct 16, 2026.** Policies and decisions have changed since then, and some paths outside the gateway section have moved. Check `README.md` for what has and hasn't changed before treating anything here as current.

## Goal

Make the Gateway docs match the Foundation's stated position. The Foundation runs the canonical gateway. Any team can run a gateway on the same open rails. The Foundation **enables** every operator, **endorses** operators that meet published criteria, and **expands** reach only by agreement. Two constraints apply:

- **(a) Don't reveal revenue or strategic intent.** The docs say _what_ is on offer, not _why it benefits the Foundation_ or _how it is priced_.
- **(b) Don't over-promise.** Every support, listing or referral statement in the docs must be something the Foundation would actually do for any gateway that asks.

## Disclosure rules

**Publish (public commitments the memo already intends for the docs):**

- The Foundation operates the canonical gateway at thegraph.com (gateway, Studio, Explorer). It uses the same open-source software, Indexer selection and Graph Tally rails as everyone else, with no privileged routing.
- Foundation-operated protocol components (Subgraph Service, Subgraph Availability Oracle) treat every gateway the same, including the canonical gateway.
- Enablement is open to everyone with no application: open-source software, docs, historical context, and limited setup help that ends at launch.
- After launch, the operator owns its uptime, incidents and customer support.
- Enablement includes no public mention, listing or referral.
- Endorsement exists and is decided by published, Council-approved QoS and brand criteria. It is gained after 3 months at threshold and lost after 2 consecutive months below. Public QoS metrics are required.
- Expansion (listings, marketing, BD and events) exists only by individual agreement, is offered selectively, and requires Endorsement first. Paid placements are labeled as partnerships.
- The canonical gateway stays the default on Foundation surfaces.
- Switching cost: a consumer who changes gateways needs a new endpoint and API key. Studio-issued keys work only on the canonical gateway.
- Disputes about Foundation favoritism can be escalated to The Graph Council.
- The protocol-level Subgraph Service operator fee, if mentioned at all: it applies equally to every gateway and is set through governance. Link the Council decision; give no sizing commentary.

**Keep internal (do not publish in any form):**

- The canonical gateway's financial goal (profit), and fallback as a revenue line (§2A, 3D).
- The flagship-placement exception clause ("low runway / exceptional revenue").
- The §2C "Limiting External Leverage" framing (handcuffing, price discipline, competing business objectives). The public version is one neutral sentence: the network always has an open default path.
- Product-layer and brand-layer fee models, example percentages (20% etc.), listing fees and referral shares (§5B, 5C).
- Operator-cut sizing ("1% won't cover costs"), financial modeling, and use of revenue or buybacks (§5A trade-offs, 5D, 8B).
- Referral policy details, and that the Foundation doesn't refer users out by default (§4C). The public version: "Enablement does not include user referrals."
- Data Collection / Use Case APIs as a Foundation business line (§3D).
- Operator segmentation, "large operators vs smaller brands" (§4D).
- Support budget numbers (2–4 hrs/week, 10-hr review trigger), internal Slack, and named DRIs.
- The conflict-of-interest paragraph's wording (§4A). Optional: one sentence acknowledging the Foundation is both steward and operator, paired with the guardrails. See open decision 3.

## Conflicts with the Oct 9 provider-neutral plan

The provider-neutral plan (`../provider-neutral/plan.md`) predates this memo. Three of its items contradict the strategy and would mislead gateways (constraint b):

1. **"Choosing a Provider" directory with equal, alphabetical, self-reported listings and a "Getting listed" PR process.** The memo says external gateways get no Docs listing except through Expansion (§3B, 3C, 5B), and the canonical gateway stays the default. Recommendation: drop the open directory and PR process. Keep the neutral _concepts_ (what a gateway is, what is portable, what to compare), and say listings appear only for gateways with a partnership.
2. **"Name operators plainly: Edge & Node for Studio and gateway.thegraph.com."** The memo says the Foundation now operates the gateway, Studio and Explorer. Update both plans, and the Fair Use and Upgrade Indexer wording, to match.
3. **Drop "canonical" from networks-registry descriptions.** The memo uses "canonical gateway" as its official term. Keep "canonical" for the Foundation's gateway, and introduce a neutral kind/operator field only if multiple gateways are actually listed.

## Page-by-page plan

### 1. `overview.mdx` (rewrite about 30%)

- **Intro.** Keep it. Add one sentence saying that anyone can run a gateway and none needs permission from The Graph Foundation.
- **NEW section "The Canonical Gateway and Other Gateways"** (after "The Subgraph Network"):
  - The Foundation runs the canonical gateway behind thegraph.com, Subgraph Studio and Graph Explorer, and it is the default path for developers on those surfaces.
  - It runs on the same open-source gateway, Indexer Selection and Graph Tally rails described in these docs, with no privileged routing. Fixes found in production flow back to the open-source software.
  - Foundation-operated protocol components (Subgraph Service, SAO) treat all gateways identically, and their decisions are public or auditable.
  - Published Subgraphs live onchain, so any gateway can serve any of them. Consumers switch with a new endpoint and key.
  - The canonical gateway publishes its QoS onchain (QoS Oracle Subgraph) as a public reference point. Frame it as "a reference point," not "a floor."
- **"Why Providers Run Subgraph Gateways."** Keep it. Soften "core commercial advantage" slightly; it currently reads as the Foundation promising an operator's business case. Keep the benefits factual.
- **NEW short section "Working with The Graph Foundation"**: three bullets (Enablement / Endorsement / Partnerships) and a link to the new page (§2 below).
- **"How Graph Gateway Docs Are Organized."** Add the new page.

### 2. NEW page: `ecosystem/working-with-the-foundation.mdx`

The public version of memo §3–4, written for an incoming gateway team. Suggested sections:

1. **What every gateway gets (Enablement).** Open-source Graph Node, gateway, Gateway in a Box and Graph Tally. These docs. Historical context on pricing, common practices and common errors. Limited technical help with setup, configuration, wallets, escrow and first queries. No application or agreement needed.
2. **What Enablement doesn't include.** State this plainly:
   - Support ends at launch. You own uptime, incidents and support for your customers.
   - No public mention, listing in Docs, Explorer or Studio, marketing, or user referrals.
   - No access to canonical gateway users or usage data.
   - Studio API keys don't work on your gateway. Issue your own.
3. **What the Foundation doesn't ask of you.** No access to your IP, users or revenue. No say over your pricing, product or marketing. These apply at Enablement; Endorsement and partnerships come with their own terms.
4. **Endorsement.** What it is: public acknowledgement on The Graph's X, LinkedIn, Discord and Forum. Requirements: QoS threshold, public QoS metrics, brand guidelines and ecosystem alignment. Entry is 3 months at threshold or a unique feature or service; loss is 2 consecutive months below threshold or brand misuse, after notice. It is not a business relationship and comes with no listing. _Criteria tables are placeholders until the Council approves them. See open decision 1._
5. **Partnerships (Expansion).** Additional placement and promotion may be available through an individual agreement. Requires Endorsement first and QoS at or above Endorsement criteria. Offered selectively. Paid placements are labeled. The canonical gateway stays the default wherever a partner is listed. **No fee models or percentages.**
6. **What stays the same for every gateway.** The guardrails: equal terms per tier, public criteria, shared improvements to open-source software, neutral protocol components, the Council escalation path, and low switching costs.
7. **How to get in touch.** One neutral channel (a form or email alias, not "contact Discord mods"). Set expectations that setup help is limited and best-effort.

Add it to `ecosystem/_meta.js` and to the nginx/route lockfile if the sidebar route is new.

### 3. `consumer-side/customer-support.mdx` (rewrite; highest risk for constraint b)

- **Remove** "The Graph Foundation can provide a dedicated support channel by contacting The Graph Discord moderators… engage the Foundation early so this channel is in place." This contradicts §3A, where support ends at launch and runs through a limited internal channel.
- **Remove** "a Foundation-provided channel for operator and protocol issues" from the tiered structure.
- Reframe the page as _how an operator supports its own customers_: its own support desk, Discord as community help for general Subgraph questions, and Telegram/Slack for enterprise.
- Add a short note: pre-launch setup help is available per "Working with the Foundation." After launch, operator and customer support are the operator's responsibility. Protocol bugs go to the public GitHub repos.

### 4. `consumer-side/pricing-payments.mdx`

- Replace "Edge & Node's Subgraph Studio pricing is a reference point" with "the canonical gateway's published pricing (Subgraph Studio) is one reference point." **Link to the live pricing page instead of hardcoding** "100,000 free / $2 per 100k." That prevents drift and avoids implying a price the Foundation commits to keep.
- "The same way Subgraph Studio and The Graph Market accept cards": keep, since it is factual.
- Don't add anything about the canonical gateway's pricing philosophy (profit, no loss-leader). That is internal.

### 5. Studio API key claims (correctness fix; would mislead operators today)

- `components/overview.mdx` §1 Authentication: "API key: issued from Subgraph Studio" → "issued by the Gateway Operator (for the canonical gateway, keys are issued in Subgraph Studio)."
- `components/operating-a-gateway.mdx`: "API keys can be issued from within a Gateway Operator's UI **or from within Subgraph Studio**" → remove the Studio option for third-party gateways. Studio-issued keys authenticate only on the canonical gateway. (Also fix the "from from" typo on that line.)
- `consumer-side/serving-queries.mdx` line 39: same fix.
- `components/gateway-in-a-box.mdx`: `TOPOLOGY_STUDIO_KEY` stays, since it is a read-only key for network topology. Add one line explaining that this key reads network data and does not authenticate your consumers.

### 6. `supply-side/tracking-qos.mdx`

- "publishes QoS data for the Gateway operated by Edge & Node" → "for the canonical gateway operated by The Graph Foundation." (Confirm the oracle submitter and ownership actually transferred before merging.)
- Add a forward pointer: publishing a QoS Oracle is a requirement for Endorsement (link to the new page).
- "Canonical oracle / canonical deployment" wording can stay; it is consistent with the memo's terminology.

### 7. `consumer-side/indexing-approaches.mdx`

- Fix the absolute Upgrade Indexer link (`https://thegraph.com/docs/en/subgraphs/providers/...`) to a relative path. Repoint it if the Upgrade Indexer moves out of the Studio folder per the provider-neutral plan.
- Recheck that "Foundation's position" statements read as guidance, not conditions of support.

### 8. `ecosystem/chain-integrations.mdx` (flag for constraint a)

This page is outside the memo's scope but already exposes Foundation commercial structure: the "Foundation base" revenue split, the BD sourcing share, and the "strong preference for a shared BD and marketing pipeline." Recommendation: either keep it as an already-public chain-integration policy, or trim the revenue-split paragraph to "economics are negotiated per chain." **Get a decision from whoever owns the chain-integration memo.** Don't change it without that.

### 9. Light touch / no change

- `components/graph-tally`, `indexer-selection`, `titorelli`, `supply-side/routing-queries`, `managing-escrow`, `incentivizing-syncs`, `ecosystem/graph-node`: no strategy conflicts.
- `consumer-side/subgraph-collections`: keep. Don't hint that the Foundation will productize Collections into APIs (§3D).
- `consumer-side/publication-flows`: "Subgraph Studio, or an Operator's own product surface" is fine. Optionally note that publishing is onchain and Studio is one UI for it.

### 10. Outside the gateway section (small, same PR)

- `resources/glossary.mdx`: add **Gateway**, **Canonical gateway** and **Gateway Operator**. Fix the "Graph Explorer endpoint" definition, which calls `gateway.thegraph.com` the "Explorer endpoint."
- `subgraphs/providers/subgraph-studio/fair-use-policy.mdx`: reconcile "Edge & Node Support Team" with Foundation operation.

## Phasing

1. **First PR (no Council dependency):**
   - Overview rewrite
   - Customer Support rewrite
   - Studio-key correctness fixes
   - E&N → Foundation attribution fixes (pricing, QoS Oracle)
   - New "Working with the Foundation" page, with Endorsement written descriptively and criteria marked _"to be published after Council approval"_
   - Glossary and link fixes
2. **After the Council approves the QoS and brand criteria:** add the criteria tables, the application/notice process, and the brand guidelines link to the new page. Announce on socials, per memo §4E.
3. **After the referral policy and Expansion terms are settled:** consider whether a public "partners" page is needed at all. Default: no, until a partnership exists.
4. **Revise the provider-neutral plan** to remove the open directory and update the operator naming (see the Conflicts section).

## Open decisions (as of Oct 16)

1. **Endorsement detail before Council approval.** Publish the 3-month / 2-month rules now (they are in the memo as decided) or wait for the full criteria? Recommendation: publish the structure now and the thresholds later.
2. **Expansion visibility.** Mention partnerships at all, or leave them out until the first one exists? Recommendation: one short paragraph, with no fee language, so teams don't assume listings come free with Endorsement.
3. **Conflict-of-interest acknowledgement.** Add one public sentence ("The Foundation both stewards the network and operates a gateway; these guardrails limit how that affects other operators")? It builds trust with gateways but invites scrutiny. Recommendation: include it, paired with the Council escalation path.
4. **Fallback service (§3D).** Mention that the canonical gateway can act as a contracted fallback? It is useful to operators but signals a revenue line. Recommendation: omit for now and handle in BD conversations.
5. **Operator fee (§5A).** Mention the Council-approved Subgraph Service operator fee on the Pricing page as a cost every gateway bears? Recommendation: yes, factually, once it is live onchain, with a link to the governance record and no percentage commentary.
6. **Contact channel.** What public intake channel should replace "contact Discord moderators"? It needs an owner.
7. **QoS Oracle ownership.** Confirm the Foundation now runs the submitter before changing the attribution.
