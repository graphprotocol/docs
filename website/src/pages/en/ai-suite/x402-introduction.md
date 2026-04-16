# Introduction

Pay-per-query access to subgraphs on The Graph Network using the x402 payment protocol.

The Subgraph Gateway accepts x402 payments for per-query access to subgraphs on The Graph Network. Agents and applications can pay in USDC over HTTP without an API key.

## Overview

The Gateway's x402 endpoints enable:

- **Per-query access** to any subgraph published on The Graph Network
- **USDC payments** on Base (mainnet) and Base Sepolia (testnet)
- **No API keys, accounts, or sessions** — payment and access happen in a single HTTP round trip
- **Compatible with any x402 client**, with first-class support via `@graphprotocol/client-x402`

The existing API-key endpoints continue to work unchanged. x402 is an additional access path under `/api/x402/...`.

## Network Configuration

| Environment | Base URL | Payment Network | USDC Token Address |
| --- | --- | --- | --- |
| Mainnet | `https://gateway.thegraph.com` | Base | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| Testnet | `https://testnet.gateway.thegraph.com` | Base Sepolia | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |

## Endpoints

x402-enabled endpoints mirror the existing gateway paths under an `x402` prefix:

| Access Method | Subgraph ID | Deployment ID |
| --- | --- | --- |
| API Key | `POST /api/subgraphs/id/{subgraph_id}` | `POST /api/deployments/id/{deployment_id}` |
| x402 | `POST /api/x402/subgraphs/id/{subgraph_id}` | `POST /api/x402/deployments/id/{deployment_id}` |

## How It Works

1. The client sends a GraphQL query to an `/api/x402/...` endpoint.
2. The Gateway responds with `402 Payment Required` and payment requirements (amount, network, asset, recipient).
3. The client signs a USDC payment payload and retries the request with the payment header.
4. The Gateway verifies the payment via a facilitator and returns the query result.

## Minimal Example

The fastest path is the official Graph x402 client:

```bash
npm install @graphprotocol/client-x402
```

```bash
export X402_PRIVATE_KEY=0x...

npx graphclient-x402 "{ pairs(first: 5) { id } }" \
  --endpoint https://gateway.thegraph.com/api/x402/subgraphs/id/<SUBGRAPH_ID> \
  --chain base
```

For programmatic and typed SDK usage, see the Quick Start guide.

## When to Use x402

x402 is well suited to:

- **Autonomous agents** and short-lived processes that can't store long-term credentials
- **Per-query workloads** where pre-purchased credits don't fit the access pattern
- **Integrations that prefer HTTP-native payment** over account creation and key management

For sustained, high-volume application use, the existing API-key flow remains the recommended path.

## Next Steps

- **Quick Start** — get a paid query running in under a minute
- **Using Graph Client** — typed SDK and codegen with `@graphprotocol/client-x402`
- **Payment Configuration** — environment variables, networks, and pricing
- **Discovery** — how x402 endpoints appear in agent discovery layers
