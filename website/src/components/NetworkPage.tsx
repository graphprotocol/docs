import Head from 'next/head'
import { useRouter } from 'next/router'
import { useData } from 'nextra/hooks'

import { ExperimentalDescriptionList, ExperimentalLink, Grid, Text } from '@edgeandnode/gds'

import NetworkDetailsPage from '@/components/NetworkDetailsPage'
import { useI18n } from '@/i18n'

interface Network {
  id: string
  fullName: string
  shortName?: string
  networkType: string
  graphNode?: {
    protocol: string
  }
  caip2Id?: string
  nativeToken?: string
  docsUrl?: string
}

interface NetworkPageProps {
  network?: Network
}

export function NetworkPage({ network }: NetworkPageProps) {
  const data = useData()
  const contextNetwork = data?.ssg?.network || data?.network
  const networkData = network || contextNetwork
  const { t } = useI18n()
  const router = useRouter()
  const { locale = 'en' } = router

  if (!networkData) {
    return <div>Network not found</div>
  }

  return (
    <>
      <Head>
        <title>{networkData.fullName}</title>
      </Head>
      <div className="col-[container]">
        <h2 className="mb-4 text-24 text-white">{networkData.fullName}</h2>

        <Grid className="gap-4">
          <div className="col-span-2">
            <div>
              <ExperimentalDescriptionList size="small">
                {networkData.networkType && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.type')}>
                    <Text.P14>{networkData.networkType}</Text.P14>
                  </ExperimentalDescriptionList.Item>
                )}
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
            protocol: networkData.graphNode?.protocol,
            chainId: networkData.caip2Id?.split(':')[1],
            nativeCurrency: networkData.nativeToken,
            docs: networkData.docsUrl,
          }}
          locale={locale}
        />
      </div>
    </>
  )
}
