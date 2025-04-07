import { ExperimentalCopyButton, ExperimentalDescriptionList, ExperimentalLink } from '@edgeandnode/gds'
import { Subgraph, Substreams, SubstreamsPoweredSubgraph } from '@edgeandnode/gds/icons'
import { NetworkIcon } from '@edgeandnode/go'

import { Card, TimeIcon } from '@/components'
import { useI18n } from '@/i18n'

import { getIconVariant, type SupportedNetwork } from './utils'

export function NetworkDetailsPage({ network }: { network: SupportedNetwork }) {
  const { t } = useI18n()

  return (
    <div className="col-[container]">
      <div className="mb-5 mt-12 flex flex-col gap-3">
        {network.caip2Id ? (
          <NetworkIcon variant={getIconVariant(network.id)} caip2Id={network.caip2Id as any} size={10} />
        ) : null}
        <h2 className="leading-tight mt-0 text-24 text-white">{network.fullName}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div>
            <ExperimentalDescriptionList size="medium">
              <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.type')}>
                {network.networkType}
              </ExperimentalDescriptionList.Item>
              {network.graphNode?.protocol && (
                <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.protocol')}>
                  {network.graphNode.protocol}
                </ExperimentalDescriptionList.Item>
              )}
              {network.id && (
                <ExperimentalDescriptionList.Item
                  variant="mono"
                  label={t('index.supportedNetworks.identifier')}
                  action={<ExperimentalCopyButton size="small" variant="naked" value={network.id} />}
                >
                  {network.id}
                </ExperimentalDescriptionList.Item>
              )}
              {network.caip2Id && (
                <ExperimentalDescriptionList.Item
                  variant="mono"
                  label={t('index.supportedNetworks.chainId')}
                  action={<ExperimentalCopyButton size="small" variant="naked" value={network.caip2Id} />}
                >
                  {network.caip2Id}
                </ExperimentalDescriptionList.Item>
              )}
              {network.nativeToken && (
                <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.nativeCurrency')}>
                  {network.nativeToken}
                </ExperimentalDescriptionList.Item>
              )}
              {network.docsUrl && (
                <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.docs')}>
                  <ExperimentalLink className="text-14" href={network.docsUrl} target="_blank">
                    {network.docsUrl}
                  </ExperimentalLink>
                </ExperimentalDescriptionList.Item>
              )}
            </ExperimentalDescriptionList>
          </div>
        </div>
      </div>

      <hr />

      <h3 className="text-h18 mt-0">{t('index.supportedNetworks.guides')}</h3>

      <div className="graph-docs-not-markdown mt-8">{network.evm ? <EVMResources /> : <NonEVMResources />}</div>
    </div>
  )
}

function EVMResources() {
  const { t } = useI18n()

  return (
    <div className="grid grid-cols-1 gap-4">
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
}

function NonEVMResources() {
  const { t } = useI18n()

  return (
    <div className="grid grid-cols-1 gap-4">
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
}
