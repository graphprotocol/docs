import { useData } from 'nextra/hooks'
import { Heading } from '@/components'
import { ExperimentalDescriptionList, Grid } from '@edgeandnode/gds'
import Head from 'next/head'
import { useI18n } from '@/i18n'
import NetworkDetailsPage from '@/components/NetworkDetailsPage'
import { useRouter } from 'next/router'

export function NetworkPage({ network }) {
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
                    {networkData.networkType}
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.graphNode?.protocol && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.protocol')}>
                    {networkData.graphNode.protocol}
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.id && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.identifier')}>
                    {networkData.id}
                  </ExperimentalDescriptionList.Item>
                )}
                {networkData.caip2Id && (
                  <ExperimentalDescriptionList.Item label={t('index.supportedNetworks.chainId')}>
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
                    <a href={networkData.docsUrl} target="_blank" rel="noopener noreferrer">
                      {networkData.docsUrl}
                    </a>
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
