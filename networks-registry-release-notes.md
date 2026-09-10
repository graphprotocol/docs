# Networks Registry — Release Notes

**Release:** next patch (assigned by CI on merge, ~v0.7.120)
**Date:** 2026-09-09

Subgraph Studio (`services.subgraphs`) support changes across five EVM networks, including one new network.

## New networks

- **Anubis Mainnet** (`eip155:6714`, id `anubis`) — a privacy-focused, EVM-compatible Layer 1. Added with Subgraph Studio support. Native token gasDAI; explorer [browser.anubispace.org](https://browser.anubispace.org) (Blockscout).

## Subgraph Studio support added

- **Zilliqa 2.0 Mainnet** (`eip155:32769`, id `zilliqa`) — mainnet now supports Subgraph Studio, matching the already-supported Zilliqa 2.0 Testnet.
- **Anubis Mainnet** (`eip155:6714`, id `anubis`) — see above.

## Subgraph Studio support removed

- **Botanix Mainnet** (`eip155:3637`, id `botanix`)
- **Botanix Testnet** (`eip155:3636`, id `botanix-testnet`)
- **Arbitrum Nova** (`eip155:42170`, id `arbitrum-nova`)

## Notes

- All changes are limited to the `services.subgraphs` field; no Firehose/Substreams endpoints, RPCs, or other network configuration were modified on existing chains.
- Internal: `anubis` added to the ethereum-lists validation allowlist (chain 6714 is not yet upstream); to be removed once it lands.
