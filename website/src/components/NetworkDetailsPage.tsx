import { NetworkType } from '@pinax/graph-networks-registry'
import Head from 'next/head'
import type { ComponentPropsWithoutRef } from 'react'

import { classNames } from '@edgeandnode/gds'
import { translate } from '@edgeandnode/gds'
import { ExperimentalLink } from '@edgeandnode/gds'
import { Clock, Subgraph, Substreams, SubstreamsPoweredSubgraph } from '@edgeandnode/gds/icons'

import { Card } from '@/components'
import { translations, useI18n } from '@/i18n'

type NetworkDetailsPageProps = {
  network: {
    id: string
    fullName: string
    networkType: NetworkType
    protocol: string
    chainId: number | string
    nativeCurrency: string
    docs: string
  }
  locale?: string
}

const isNonEVMNetwork = (networkId: string): boolean => {
  const nonEVMIds = [
    'eos',
    'jungle4',
    'kylin',
    'telos-testnet',
    'telos',
    'wax-testnet',
    'wax',
    'arweave-mainnet',
    'gnosis-chiado-cl',
    'gnosis-cl',
    'holesky-cl',
    'mainnet-cl',
    'sepolia-cl',
    'btc',
    'litecoin',
    'injective-mainnet',
    'injective-testnet',
    'mantra-mainnet',
    'mantra-testnet',
    'near-mainnet',
    'near-testnet',
    'solana-accounts',
    'solana-devnet',
    'solana-mainnet',
    'solana-mainnet-beta',
    'solana-testnet',
    'starknet-mainnet',
    'starknet-testnet',
  ]
  return nonEVMIds.includes(networkId)
}

function Time({
  variant,
  minutes,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & {
  variant: 'reading' | 'duration'
  minutes: number
}) {
  const { t } = useI18n()
  return (
    <div className={classNames(['flex items-center gap-1 leading-none', className])} {...props}>
      <Clock
        alt={variant === 'reading' ? t('index.time.reading') : t('index.time.duration')}
        variant="fill"
        size={3.5}
      />
      {minutes} {t('index.time.minutes')}
    </div>
  )
}

function EVMResources() {
  const { t } = useI18n()

  return (
    <div className="graph-docs-not-markdown mt-8 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          href="https://thegraph.com/docs/en/subgraphs/quick-start/"
          title={t('index.networkGuides.evm.subgraphQuickStart.title')}
          description={t('index.networkGuides.evm.subgraphQuickStart.description')}
          slotAboveTitle={<Time variant="reading" minutes={10} />}
          className="min-h-[252px]"
          icon={
            <div className="flex size-8 items-center justify-center text-white">
              <Subgraph size={6} />
            </div>
          }
        />
        <Card
          href="https://docs.substreams.dev/"
          title={t('index.networkGuides.evm.substreams.title')}
          description={t('index.networkGuides.evm.substreams.description')}
          slotAboveTitle={<Time variant="reading" minutes={15} />}
          className="min-h-[252px]"
          icon={
            <div className="flex size-8 items-center justify-center text-white">
              <Substreams size={6} />
            </div>
          }
        />
        <Card
          href="https://thegraph.com/docs/en/subgraphs/best-practices/timeseries/"
          title={t('index.networkGuides.evm.timeseries.title')}
          description={t('index.networkGuides.evm.timeseries.description')}
          slotAboveTitle={<Time variant="reading" minutes={8} />}
          className="min-h-[252px]"
          icon={
            <div className="flex size-8 items-center justify-center text-white">
              <Substreams size={6} />
            </div>
          }
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card
          href="https://thegraph.com/docs/en/subgraphs/developing/creating/advanced/"
          title={t('index.networkGuides.evm.advancedFeatures.title')}
          description={t('index.networkGuides.evm.advancedFeatures.description')}
          slotAboveTitle={<Time variant="reading" minutes={12} />}
        />
        <Card
          href="https://thegraph.com/docs/en/subgraphs/billing/"
          title={t('index.networkGuides.evm.billing.title')}
          description={t('index.networkGuides.evm.billing.description')}
          slotAboveTitle={<Time variant="reading" minutes={5} />}
        />
      </div>
    </div>
  )
}

function NonEVMResources() {
  const { t } = useI18n()

  return (
    <div className="graph-docs-not-markdown mt-8 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          href="https://docs.substreams.dev/"
          title={t('index.networkGuides.nonEvm.officialDocs.title')}
          description={t('index.networkGuides.nonEvm.officialDocs.description')}
          slotAboveTitle={<Time variant="reading" minutes={15} />}
          className="min-h-[252px]"
          icon={
            <div className="flex size-8 items-center justify-center text-white">
              <Substreams size={6} />
            </div>
          }
        />
        <Card
          href="https://thegraph.com/docs/en/sps/introduction/"
          title={t('index.networkGuides.nonEvm.spsIntro.title')}
          description={t('index.networkGuides.nonEvm.spsIntro.description')}
          slotAboveTitle={<Time variant="reading" minutes={8} />}
          className="min-h-[252px]"
          icon={
            <div className="flex size-8 items-center justify-center text-white">
              <SubstreamsPoweredSubgraph size={6} />
            </div>
          }
        />
        <Card
          href="https://substreams.dev/"
          title={t('index.networkGuides.nonEvm.substreamsDev.title')}
          description={t('index.networkGuides.nonEvm.substreamsDev.description')}
          slotAboveTitle={<Time variant="reading" minutes={10} />}
          className="min-h-[252px]"
          icon={
            <div className="flex size-8 items-center justify-center text-white">
              <Substreams size={6} />
            </div>
          }
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card
          href="https://github.com/streamingfast/substreams-starter"
          title={t('index.networkGuides.nonEvm.substreamsStarter.title')}
          description={t('index.networkGuides.nonEvm.substreamsStarter.description')}
          slotAboveTitle={<Time variant="reading" minutes={5} />}
        />
        <Card
          href="https://github.com/streamingfast/substreams"
          title={t('index.networkGuides.nonEvm.substreamsRepo.title')}
          description={t('index.networkGuides.nonEvm.substreamsRepo.description')}
          slotAboveTitle={<Time variant="reading" minutes={7} />}
        />
      </div>
    </div>
  )
}

export default function NetworkDetailsPage({ network, locale = 'en' }: NetworkDetailsPageProps) {
  const { t } = useI18n()

  return (
    <>
      <h3 className="mt-0 text-h18">{t('index.supportedNetworks.guides')}</h3>
      {isNonEVMNetwork(network.id) ? <NonEVMResources /> : <EVMResources />}
    </>
  )
}
