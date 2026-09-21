import type { ComponentType } from 'react'

import Anubis from './anubis.mdx'
import ArbitrumOne from './arbitrum-one.mdx'
import ArbitrumSepolia from './arbitrum-sepolia.mdx'
import Arc from './arc.mdx'
import ArcTestnet from './arc-testnet.mdx'
import Avalanche from './avalanche.mdx'
import Base from './base.mdx'
import BaseSepolia from './base-sepolia.mdx'
import Blast from './blast-mainnet.mdx'
import Boba from './boba.mdx'
import BobaTestnet from './boba-testnet.mdx'
import Bsc from './bsc.mdx'
import Btc from './btc.mdx'
import Celo from './celo.mdx'
import CeloSepolia from './celo-sepolia.mdx'
import Chapel from './chapel.mdx'
import Chiliz from './chiliz.mdx'
import ChilizTestnet from './chiliz-testnet.mdx'
import Vaulta from './eos.mdx'
import Etherlink from './etherlink-mainnet.mdx'
import EtherlinkShadownet from './etherlink-shadownet.mdx'
import Fraxtal from './fraxtal.mdx'
import Fuji from './fuji.mdx'
import Fuse from './fuse.mdx'
import FuseTestnet from './fuse-testnet.mdx'
import Gnosis from './gnosis.mdx'
import GnosisChiado from './gnosis-chiado.mdx'
import GnosisBeacon from './gnosis-cl.mdx'
import Hemi from './hemi.mdx'
import HemiSepolia from './hemi-sepolia.mdx'
import Hoodi from './hoodi.mdx'
import HoodiBeacon from './hoodi-cl.mdx'
import HyperEvm from './hyper-evm.mdx'
import InjectiveEvm from './injective-evm.mdx'
import InjectiveEvmTestnet from './injective-evm-testnet.mdx'
import Injective from './injective-mainnet.mdx'
import InjectiveTestnet from './injective-testnet.mdx'
import Ink from './ink.mdx'
import Joc from './joc.mdx'
import JocTestnet from './joc-testnet.mdx'
import Jungle4 from './jungle4.mdx'
import Kaia from './kaia.mdx'
import KaiaTestnet from './kaia-testnet.mdx'
import Linea from './linea.mdx'
import LineaSepolia from './linea-sepolia.mdx'
import Litecoin from './litecoin.mdx'
import Ethereum from './mainnet.mdx'
import EthereumBeacon from './mainnet-cl.mdx'
import Polygon from './matic.mdx'
import MegaEth from './megaeth.mdx'
import Monad from './monad.mdx'
import Near from './near-mainnet.mdx'
import NearTestnet from './near-testnet.mdx'
import NeoX from './neox.mdx'
import NeoXTestnet from './neox-testnet.mdx'
import Optimism from './optimism.mdx'
import OptimismSepolia from './optimism-sepolia.mdx'
import Peaq from './peaq.mdx'
import PolygonAmoy from './polygon-amoy.mdx'
import Robinhood from './robinhood.mdx'
import RobinhoodSepolia from './robinhood-sepolia.mdx'
import Rootstock from './rootstock.mdx'
import RootstockTestnet from './rootstock-testnet.mdx'
import Scroll from './scroll.mdx'
import ScrollSepolia from './scroll-sepolia.mdx'
import SeiAtlantic from './sei-atlantic.mdx'
import SeiMainnet from './sei-mainnet.mdx'
import Sepolia from './sepolia.mdx'
import SepoliaBeacon from './sepolia-cl.mdx'
import SolanaAccounts from './solana-accounts.mdx'
import SolanaDevnet from './solana-devnet.mdx'
import Solana from './solana-mainnet-beta.mdx'
import Soneium from './soneium.mdx'
import SoneiumTestnet from './soneium-testnet.mdx'
import Sonic from './sonic.mdx'
import SonicTestnet from './sonic-testnet.mdx'
import Stable from './stable.mdx'
import Starknet from './starknet-mainnet.mdx'
import StarknetTestnet from './starknet-testnet.mdx'
import Stellar from './stellar.mdx'
import StellarTestnet from './stellar-testnet.mdx'
import Tempo from './tempo.mdx'
import TempoModerato from './tempo-moderato.mdx'
import Tron from './tron.mdx'
import TronEvm from './tron-evm.mdx'
import Unichain from './unichain.mdx'
import UnichainTestnet from './unichain-testnet.mdx'
import Viction from './viction.mdx'
import Wax from './wax.mdx'
import WaxTestnet from './wax-testnet.mdx'
import WorldChain from './worldchain.mdx'
import XLayer from './xlayer-mainnet.mdx'
import XLayerSepolia from './xlayer-sepolia.mdx'
import Zetachain from './zetachain.mdx'
import Zilliqa from './zilliqa.mdx'
import ZilliqaTestnet from './zilliqa-testnet.mdx'
import ZksyncEra from './zksync-era.mdx'
import ZksyncEraSepolia from './zksync-era-sepolia.mdx'
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
  // Substreams-only custom content (subgraph sections to be added later)
  'arbitrum-one': ArbitrumOne,
  arc: Arc,
  base: Base,
  'injective-evm': InjectiveEvm,
  linea: Linea,
  mainnet: Ethereum,
  optimism: Optimism,
  soneium: Soneium,
  unichain: Unichain,
  'arbitrum-sepolia': ArbitrumSepolia,
  'base-sepolia': BaseSepolia,
  chapel: Chapel,
  hoodi: Hoodi,
  'injective-evm-testnet': InjectiveEvmTestnet,
  'linea-sepolia': LineaSepolia,
  'optimism-sepolia': OptimismSepolia,
  'polygon-amoy': PolygonAmoy,
  'robinhood-sepolia': RobinhoodSepolia,
  sepolia: Sepolia,
  'soneium-testnet': SoneiumTestnet,
  'unichain-testnet': UnichainTestnet,
  avalanche: Avalanche,
  celo: Celo,
  tempo: Tempo,
  'xlayer-mainnet': XLayer,
  'near-mainnet': Near,
  'near-testnet': NearTestnet,
  'starknet-testnet': StarknetTestnet,
  'stellar-testnet': StellarTestnet,
  'injective-testnet': InjectiveTestnet,
  jungle4: Jungle4,
  'wax-testnet': WaxTestnet,
  // Community Subgraph custom content
  boba: Boba,
  'boba-testnet': BobaTestnet,
  fuse: Fuse,
  'fuse-testnet': FuseTestnet,
  fraxtal: Fraxtal,
  rootstock: Rootstock,
  'rootstock-testnet': RootstockTestnet,
  // Community Subgraph — additional EVM chains
  gnosis: Gnosis,
  scroll: Scroll,
  sonic: Sonic,
  'zksync-era': ZksyncEra,
  // Studio Subgraph (publishing enabled, no guaranteed indexing yet)
  'arc-testnet': ArcTestnet,
  fuji: Fuji,
  'celo-sepolia': CeloSepolia,
  chiliz: Chiliz,
  'chiliz-testnet': ChilizTestnet,
  'etherlink-mainnet': Etherlink,
  'etherlink-shadownet': EtherlinkShadownet,
  'gnosis-chiado': GnosisChiado,
  hemi: Hemi,
  'hemi-sepolia': HemiSepolia,
  joc: Joc,
  'joc-testnet': JocTestnet,
  peaq: Peaq,
  'scroll-sepolia': ScrollSepolia,
  'sei-atlantic': SeiAtlantic,
  'sei-mainnet': SeiMainnet,
  'sonic-testnet': SonicTestnet,
  stable: Stable,
  'tempo-moderato': TempoModerato,
  'xlayer-sepolia': XLayerSepolia,
  zilliqa: Zilliqa,
  'zilliqa-testnet': ZilliqaTestnet,
  'zksync-era-sepolia': ZksyncEraSepolia,
  kaia: Kaia,
  'kaia-testnet': KaiaTestnet,
  neox: NeoX,
  'neox-testnet': NeoXTestnet,
  viction: Viction,
  zetachain: Zetachain,
}
