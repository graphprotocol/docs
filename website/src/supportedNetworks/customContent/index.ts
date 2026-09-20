import type { ComponentType } from 'react'

import Anubis from './anubis.mdx'
import Blast from './blast.mdx'
import Bsc from './bsc.mdx'
import Btc from './bitcoin.mdx'
import EthereumBeacon from './ethereum-beacon.mdx'
import GnosisBeacon from './gnosis-cl.mdx'
import HoodiBeacon from './ethereum-hoodi.mdx'
import HyperEvm from './hyper-evm.mdx'
import Injective from './injective.mdx'
import Ink from './ink.mdx'
import Litecoin from './litecoin.mdx'
import MegaEth from './megaeth.mdx'
import Monad from './monad.mdx'
import Polygon from './polygon.mdx'
import Robinhood from './robinhood.mdx'
import SepoliaBeacon from './ethereum-sepolia.mdx'
import Solana from './solana.mdx'
import SolanaAccounts from './solana-accounts.mdx'
import SolanaDevnet from './solana-devnet.mdx'
import Starknet from './starknet-mainnet.mdx'
import Stellar from './stellar.mdx'
import Tron from './tron.mdx'
import TronEvm from './tron-evm.mdx'
import Vaulta from './vaulta.mdx'
import Wax from './wax.mdx'
import WorldChain from './worldchain.mdx'
import Zora from './zora.mdx'

/**
 * Per-network custom content for Supported Networks landing pages.
 *
 * Keyed by the network `id` from the networks registry (e.g. `anubis`,
 * matching `/supported-networks/anubis/`). Each value is an MDX document,
 * authored exactly like the rest of the docs (callouts, tables, code blocks),
 * that `NetworkDetailsPage` renders below the metadata section.
 *
 * To give another network a custom landing page:
 *   1. Add `src/supportedNetworks/customContent/<id>.mdx`.
 *   2. Import it here and add it to the map below.
 * Networks not listed here render the default templated page, unchanged.
 */
export const customNetworkContent: Record<string, ComponentType> = {
  anubis: Anubis,
  bsc: Bsc,
  matic: Polygon,
  ink: Ink,
  'hyper-evm': HyperEvm,
  robinhood: Robinhood,
  monad: Monad,
  worldchain: WorldChain,
  zora: Zora,
  btc: Btc,
  'blast-mainnet': Blast,
  'mainnet-cl': EthereumBeacon,
  'hoodi-cl': HoodiBeacon,
  'sepolia-cl': SepoliaBeacon,
  'gnosis-cl': GnosisBeacon,
  'injective-mainnet': Injective,
  litecoin: Litecoin,
  megaeth: MegaEth,
  'solana-devnet': SolanaDevnet,
  'solana-mainnet-beta': Solana,
  'solana-accounts': SolanaAccounts,
  'starknet-mainnet': Starknet,
  stellar: Stellar,
  'tron-evm': TronEvm,
  tron: Tron,
  eos: Vaulta,
  wax: Wax,
}
