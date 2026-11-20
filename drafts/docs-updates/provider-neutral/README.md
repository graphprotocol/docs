# Provider-Neutral Subgraph Docs: Seed

This folder seeds a new branch that will rewrite the Subgraph docs so Subgraph Studio is one gateway provider among several, not the default path, pricing model or source of API keys.

## Status

- **Oct 9, 2026:** Plan drafted against branch `provider-neutral-subgraph-docs`. It has not been executed: that branch has no commits beyond `main`.
- **Nov 20, 2026:** Audit re-run against `main` @ `8aabd7d2`. The information architecture in the plan still applies, but several paths have moved. See the audit file's "Changes since the Oct 9 plan" section.

## Files

| File | What it is |
| --- | --- |
| `plan.md` | The Oct 9 plan: goals, information architecture, the Choosing a Provider page outline, editorial rules, phasing, open decisions. |
| `audit-2026-11-20.md` | Current scope by tier, using today's paths, plus the components and registry work. |
| `studio-mentions-raw.txt` | Every matching line (file:line:text) on `main` as of Nov 20. Regenerate it with the command in the audit file. |

## Open decisions

None of these has been decided yet. Settle them before writing.

1. **Studio staging deprecation:** announce it in the docs, or just make staging not depend on Studio?
2. **Code-sample endpoints:** a `<GATEWAY_URL>` placeholder, or `gateway.thegraph.com` labeled as an example?
3. **Upgrade Indexer and Fair Use Policy:** where do they live, and who is named as operator and enforcer?
4. **Choosing a Provider directory:** publish with only Studio listed, or wait for the first new gateway?
5. **Quick Start default path:** CLI `graph publish` with provider tabs only for API keys, or provider tabs throughout?
6. **networks-registry `kind` schema change:** this cycle, or when the new gateways launch?

## Related project docs

- `claude/multi-gateway-gateway-docs-plan.md`
- `claude/provider-neutral-subgraph-docs-plan.md` (same content as `plan.md`)
