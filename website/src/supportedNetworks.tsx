import { NetworksRegistry } from '@pinax/graph-networks-registry'

import { Table } from '@/components'
import { useI18n } from '@/i18n'
import { NetworkIcon } from '@edgeandnode/go'

export async function getSupportedNetworks() {
  const registry = await NetworksRegistry.fromLatestVersion()

  // Networks with Token API support
  const tokenAPINetworks = ['mainnet', 'base', 'bsc', 'arbitrum-one', 'matic', 'optimism']

  return registry.networks
    .flatMap((network) => {
      const subgraphs = Boolean(network.services.subgraphs?.length)
      const substreams = Boolean(network.services.substreams?.length)
      const firehose = Boolean(network.services.firehose?.length)
      const tokenapi = tokenAPINetworks.includes(network.id)
      if (!subgraphs && !substreams && !firehose && !tokenapi) {
        return []
      }
      return [
        {
          ...network,
          subgraphs,
          substreams,
          firehose,
          tokenapi,
        },
      ]
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
}

export async function getSupportedNetworksStaticProps() {
  return {
    props: {
      networks: await getSupportedNetworks(),
    },
  }
}

export function SupportedNetworksTable({
  networks,
}: Awaited<ReturnType<typeof getSupportedNetworksStaticProps>>['props']) {
  const { t } = useI18n()

  return (
    <Table>
      <tbody>
        <tr>
          <th>{t('supportedNetworks.name')}</th>
          <th>{t('supportedNetworks.id')}</th>
          <th align="center">{t('supportedNetworks.subgraphs')}</th>
          <th align="center">{t('supportedNetworks.substreams')}</th>
          <th align="center">{t('supportedNetworks.firehose')}</th>
          <th align="center">{t('supportedNetworks.tokenapi')}</th>
        </tr>
        {networks.map((network) => (
          <tr key={network.id}>
            <td>
              <div className="flex items-center gap-2">
                <NetworkIcon variant="branded" caip2Id={network.caip2Id as any} size={5} />
                {network.shortName}
              </div>
            </td>
            <td>
              <code className="font-mono">{network.id}</code>
            </td>
            <td align="center">{network.subgraphs ? '✓' : null}</td>
            <td align="center">{network.substreams ? '✓' : null}</td>
            <td align="center">{network.firehose ? '✓' : null}</td>
            <td align="center">{network.tokenapi ? '✓' : null}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
