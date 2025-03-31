import { NetworkType } from '@pinax/graph-networks-registry'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useData } from 'nextra/hooks'

import { ExperimentalDescriptionList, ExperimentalLink, Grid, Skeleton, Text } from '@edgeandnode/gds'
import { NetworkIcon } from '@edgeandnode/go'

import NetworkDetailsPage from '@/components/NetworkDetailsPage'
import { useI18n } from '@/i18n'
import { MISSING_ICON_NETWORKS, MONO_ICON_NETWORKS } from '@/supportedNetworks'

type CAIP2Id = `${string}:${string | number}`

interface Network {
  id: string
  fullName: string
  shortName?: string
  networkType: NetworkType
  graphNode?: {
    protocol: string
  }
  caip2Id?: CAIP2Id
  nativeToken?: string
  docsUrl?: string
}

interface NetworkPageProps {
  network?: Network
}

export function NetworkPage({ network }: NetworkPageProps) {
  const data = useData()
  const contextNetwork = data?.ssg?.network || data?.network
  const networkData: Network = network || contextNetwork || { 
    id: '',
    fullName: '',
    networkType: NetworkType.Mainnet
  }
  const { t } = useI18n()
  const router = useRouter()
  const { locale = 'en' } = router

  const getIconVariant = (networkId: string): 'mono' | 'branded' => {
    return MONO_ICON_NETWORKS.includes(networkId) ? 'mono' : 'branded'
  }
  
  const shouldShowSkeleton = (networkId: string): boolean => {
    return MISSING_ICON_NETWORKS.includes(networkId) || !networkId
  }

  return (
    <>
      <Head>
        <title>{networkData.fullName}</title>
      </Head>
      <div className="col-[container]">
        <div className="flex flex-col gap-3 mb-5 mt-12">
          {networkData.caip2Id ? (
            <div className="flex-shrink-0">
              {shouldShowSkeleton(networkData.id) ? (
                <Skeleton borderRadius="FULL" height="40px" width="40px" />
              ) : (
                <NetworkIcon 
                  variant={getIconVariant(networkData.id)} 
                  caip2Id={networkData.caip2Id as any} 
                  size={10} 
                  className="w-10 h-10"
                />
              )}
            </div>
          ) : null}
          <h2 className="text-24 text-white leading-tight mt-0">{networkData.fullName}</h2>
        </div>

        <Grid className="gap-4">
          <div className="col-span-2">
            <div>
              <ExperimentalDescriptionList size="small">
                <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.type')}>
                  <Text.P14>{networkData.networkType}</Text.P14>
                </ExperimentalDescriptionList.Item>
                {networkData.graphNode?.protocol && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.protocol')}>
                    <Text.P14>{networkData.graphNode.protocol}</Text.P14>
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.id && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.identifier')}>
                    <Text.P14>{networkData.id}</Text.P14>
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.caip2Id && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.chainId')}>
                    <Text.P14>{networkData.caip2Id}</Text.P14>
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.nativeToken && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.nativeCurrency')}>
                    <Text.P14>{networkData.nativeToken}</Text.P14>
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.docsUrl && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.docs')}>
                    <ExperimentalLink className="text-p14" href={networkData.docsUrl} target="_blank" rel="noopener noreferrer">
                      {networkData.docsUrl}
                    </ExperimentalLink>
                  </ExperimentalDescriptionList.Item>
                )}
              </ExperimentalDescriptionList>
            </div>
          </div>
        </Grid>

        <hr />

        <NetworkDetailsPage
          network={{
            id: networkData.id,
            fullName: networkData.fullName,
            networkType: networkData.networkType,
            protocol: networkData.graphNode?.protocol ?? '',
            chainId: networkData.caip2Id?.split(':')[1] ?? '',
            nativeCurrency: networkData.nativeToken ?? '',
            docs: networkData.docsUrl ?? '',
          }}
          locale={locale}
        />
      </div>
    </>
  )
}
