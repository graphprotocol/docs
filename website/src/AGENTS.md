# AGENTS.md — The Graph

> Machine-readable guide for autonomous AI agents that want to access blockchain data through The Graph at runtime. The Graph indexes and serves on-chain data across 60+ networks. Agents can consume it three ways: native MCP servers (recommended) and an x402-enabled Subgraph gateway.

**Audience:** AI agents, LLM tools, and autonomous systems integrating The Graph as a data source. **Last updated:** 2026-05-29 **Related files:** [/llms.txt](https://thegraph.com/llms.txt) · [/pricing.md](https://thegraph.com/pricing.md) · [/robots.txt](https://thegraph.com/robots.txt)

---

## Recommended: MCP server

The Graph publishes Model Context Protocol (MCP) servers — the preferred interface for agents. They work with Claude, Cursor, Cline, and any MCP-compatible client.

### Subgraph MCP

Search, inspect, and query 15,000+ Subgraphs on The Graph Network in natural language.

- **Endpoint:** `https://subgraphs.mcp.thegraph.com/sse`
- **Transport:** SSE (remote)
- **Auth:** `Authorization: Bearer <GATEWAY_API_KEY>` — get a Gateway API key from [Subgraph Studio](https://thegraph.com/studio/)
- **Docs:** https://thegraph.com/docs/en/ai-suite/subgraph-mcp/introduction/

**Tools:** | Tool | Purpose | |---|---| | `search_subgraphs_by_keyword` | Find Subgraphs by protocol/keyword | | `get_top_subgraph_deployments` | Rank deployments for a keyword by activity | | `get_deployment_30day_query_counts` | Check 30-day query volume (verify a deployment is live before querying) | | `get_schema_by_subgraph_id` / `get_schema_by_deployment_id` / `get_schema_by_ipfs_hash` | Fetch the GraphQL schema | | `execute_query_by_subgraph_id` / `execute_query_by_deployment_id` / `execute_query_by_ipfs_hash` | Run a GraphQL query against a deployment |

**Recommended agent workflow:** identify the protocol → `search_subgraphs_by_keyword` → `get_deployment_30day_query_counts` to confirm an active deployment → `get_schema_by_*` → build and `execute_query_by_*`.

**Cursor / Claude config:**

```json
{
  "mcpServers": {
    "subgraph": {
      "command": "npx",
      "args": ["mcp-remote", "--header", "Authorization:${AUTH_HEADER}", "https://subgraphs.mcp.thegraph.com/sse"],
      "env": { "AUTH_HEADER": "Bearer GATEWAY_API_KEY" }
    }
  }
}
```

### Subgraphs via Subgraph (GraphQL) gateway

Query any Subgraph on the decentralized network directly over GraphQL.

- **URL pattern:** https://gateway.thegraph.com/api/<API_KEY>/subgraphs/id/<SUBGRAPH_ID>
- **Method:** POST (GraphQL). If you get a 405 on GET, switch to POST.
- **Auth:** API key from Subgraph Studio embedded in the URL path
- **Discovery:** find <SUBGRAPH_ID> via Graph Explorer or the Subgraph MCP search_subgraphs_by_keyword tool
- **Docs:** https://thegraph.com/docs/en/subgraphs/querying/from-an-application/
- **Skills:** https://thegraph.com/docs/en/subgraphs/skills/

Example:

```
curl -X POST \
  "https://gateway.thegraph.com/api/<API_KEY>/subgraphs/id/<SUBGRAPH_ID>" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ tokens(first: 5) { id symbol } }"}'
```

### Substreams via The Graph Market

High-throughput, real-time streaming data pipelines. Served via a provider marketplace; discovery and packages are MCP-accessible.

- **Marketplace:** https://thegraph.market
- **Substreams registry / discovery:** Substreams.dev lets you search packages, inspect modules, and get sink configs programmatically
- **Docs:** https://thegraph.com/docs/en/substreams/quick-start/
- **Skills:** https://thegraph.com/docs/en/substreams/skills/

### Authentication summary

| Surface                  | Credential               | Where to get it           |
| ------------------------ | ------------------------ | ------------------------- |
| Subgraph MCP             | Gateway API key (Bearer) | Subgraph Studio           |
| Subgraph GraphQL gateway | API key (in URL)         | Subgraph Studio           |
| Substreams               | JWT access token         | thegraph.market dashboard |

### Rate limits & cost

Pricing and rate limits are documented in /pricing.md. Subgraph queries: 100,000/month free, then $2 per 100,000. Requests over a plan's rate limit return HTTP 429.

### Support

Docs: https://thegraph.com/docs/en/ AI Suite overview: https://thegraph.com/docs/en/ai-suite/ai-introduction/ Discord: https://discord.gg/graphprotocol
