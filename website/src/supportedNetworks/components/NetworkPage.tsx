import { NetworkType } from '@pinax/graph-networks-registry'
import Head from 'next/head'
import { useData } from 'nextra/hooks'
import { memo } from 'react'

import { ExperimentalCopyButton, ExperimentalDescriptionList, ExperimentalLink, Skeleton } from '@edgeandnode/gds'
import { NetworkIcon } from '@edgeandnode/go'

import { useI18n } from '@/i18n'

import { getIconVariant, type Network, shouldShowSkeleton } from '../utils'

import NetworkDetailsPage from './NetworkDetailsPage'

interface NetworkPageProps {
  network?: Network
}

export const NetworkPage = memo(({ network }: NetworkPageProps) => {
  const data = useData()
  const contextNetwork = data?.ssg?.network || data?.network
  const networkData: Network = network ||
    contextNetwork || {
      id: '',
      fullName: '',
      networkType: NetworkType.Mainnet,
      caip2Id: '',
    }

  const { t } = useI18n()

  return (
    <>
      <Head>
        <title>{networkData.fullName}</title>
      </Head>
      <div className="col-[container]">
        <div className="mb-5 mt-12 flex flex-col gap-3">
          {networkData.caip2Id ? (
            <div className="shrink-0">
              {shouldShowSkeleton(networkData.id) ? (
                <Skeleton borderRadius="FULL" height="40px" width="40px" />
              ) : (
                <NetworkIcon
                  variant={getIconVariant(networkData.id)}
                  caip2Id={networkData.caip2Id as any}
                  size={10}
                  className="h-10 w-10"
                />
              )}
            </div>
          ) : null}
          <h2 className="leading-tight mt-0 text-24 text-white">{networkData.fullName}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div>
              <ExperimentalDescriptionList size="medium">
                <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.type')}>
                  {networkData.networkType}
                </ExperimentalDescriptionList.Item>
                {networkData.graphNode?.protocol && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.protocol')}>
                    {networkData.graphNode.protocol}
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.id && (
                  <ExperimentalDescriptionList.Item
                    variant="mono"
                    label={t('index.supportedNetworks.identifier')}
                    action={<ExperimentalCopyButton size="small" variant="naked" value={networkData.id} />}
                  >
                    {networkData.id}
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.caip2Id && (
                  <ExperimentalDescriptionList.Item
                    variant="mono"
                    label={t('index.supportedNetworks.chainId')}
                    action={<ExperimentalCopyButton size="small" variant="naked" value={networkData.caip2Id} />}
                  >
                    {networkData.caip2Id}
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.nativeToken && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.nativeCurrency')}>
                    {networkData.nativeToken}
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.docsUrl && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.docs')}>
                    <ExperimentalLink
                      className="text-p14"
                      href={networkData.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {networkData.docsUrl}
                    </ExperimentalLink>
                  </ExperimentalDescriptionList.Item>
                )}
              </ExperimentalDescriptionList>
            </div>
          </div>
        </div>

        <hr />

        <NetworkDetailsPage network={networkData} />
      </div>
    </>
  )
})

NetworkPage.displayName = 'NetworkPage'
