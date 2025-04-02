import { memo } from 'react'

import { Subgraph, Substreams, SubstreamsPoweredSubgraph } from '@edgeandnode/gds/icons'

import { Card, TimeIcon } from '@/components'
import { useI18n } from '@/i18n'

import { isEVMNetwork, type Network } from '../utils'

type NetworkDetailsPageProps = {
  network: Network
}

const EVMResources = memo(() => {
  const { t } = useI18n()

  return (
    <div className="graph-docs-not-markdown mt-8 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          href="https://thegraph.com/docs/en/subgraphs/quick-start/"
          title={t('index.networkGuides.evm.subgraphQuickStart.title')}
          description={t('index.networkGuides.evm.subgraphQuickStart.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={10} />}
          className="min-h-64"
          icon={<Subgraph size={6} />}
        />
        <Card
          href="https://docs.substreams.dev/"
          title={t('index.networkGuides.evm.substreams.title')}
          description={t('index.networkGuides.evm.substreams.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={15} />}
          className="min-h-64"
          icon={<Substreams size={6} />}
        />
        <Card
          href="https://thegraph.com/docs/en/subgraphs/best-practices/timeseries/"
          title={t('index.networkGuides.evm.timeseries.title')}
          description={t('index.networkGuides.evm.timeseries.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={8} />}
          className="min-h-64"
          icon={<Substreams size={6} />}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card
          href="https://thegraph.com/docs/en/subgraphs/developing/creating/advanced/"
          title={t('index.networkGuides.evm.advancedFeatures.title')}
          description={t('index.networkGuides.evm.advancedFeatures.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={12} />}
        />
        <Card
          href="https://thegraph.com/docs/en/subgraphs/billing/"
          title={t('index.networkGuides.evm.billing.title')}
          description={t('index.networkGuides.evm.billing.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={5} />}
        />
      </div>
    </div>
  )
})

const NonEVMResources = memo(() => {
  const { t } = useI18n()

  return (
    <div className="graph-docs-not-markdown mt-8 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          href="https://docs.substreams.dev/"
          title={t('index.networkGuides.nonEvm.officialDocs.title')}
          description={t('index.networkGuides.nonEvm.officialDocs.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={15} />}
          className="min-h-64"
          icon={<Substreams size={6} />}
        />
        <Card
          href="https://thegraph.com/docs/en/sps/introduction/"
          title={t('index.networkGuides.nonEvm.spsIntro.title')}
          description={t('index.networkGuides.nonEvm.spsIntro.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={8} />}
          className="min-h-64"
          icon={<SubstreamsPoweredSubgraph size={6} />}
        />
        <Card
          href="https://substreams.dev/"
          title={t('index.networkGuides.nonEvm.substreamsDev.title')}
          description={t('index.networkGuides.nonEvm.substreamsDev.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={10} />}
          className="min-h-64"
          icon={<Substreams size={6} />}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card
          href="https://github.com/streamingfast/substreams-starter"
          title={t('index.networkGuides.nonEvm.substreamsStarter.title')}
          description={t('index.networkGuides.nonEvm.substreamsStarter.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={5} />}
        />
        <Card
          href="https://github.com/streamingfast/substreams"
          title={t('index.networkGuides.nonEvm.substreamsRepo.title')}
          description={t('index.networkGuides.nonEvm.substreamsRepo.description')}
          slotAboveTitle={<TimeIcon variant="reading" minutes={7} />}
        />
      </div>
    </div>
  )
})

EVMResources.displayName = 'EVMResources'
NonEVMResources.displayName = 'NonEVMResources'

const NetworkDetailsPage = memo(({ network }: NetworkDetailsPageProps) => {
  const { t } = useI18n()

  return (
    <>
      <h3 className="text-h18 mt-0">{t('index.supportedNetworks.guides')}</h3>
      {isEVMNetwork(network) ? <EVMResources /> : <NonEVMResources />}
    </>
  )
})

NetworkDetailsPage.displayName = 'NetworkDetailsPage'

export default NetworkDetailsPage
