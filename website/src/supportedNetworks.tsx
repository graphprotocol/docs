import { CodeInline, Table } from '@graphprotocol/nextra-theme'
import { NetworksRegistry } from '@pinax/graph-networks-registry'

import { useI18n } from '@/i18n'

export async function getSupportedNetworks() {
  const registry = await NetworksRegistry.fromLatestVersion()

  return registry.networks
    .map((network) => ({
      ...network,
      subgraphs: Boolean(network.services.subgraphs?.length),
      substreams: Boolean(network.services.substreams?.length),
      firehose: Boolean(network.services.firehose?.length),
    }))
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
}

export function SupportedNetworksTable({ networks }: { networks: Awaited<ReturnType<typeof getSupportedNetworks>> }) {
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
        </tr>
        {networks.map((network) => (
          <tr key={network.id}>
            <td>{network.fullName}</td>
            <td>
              <CodeInline>{network.id}</CodeInline>
            </td>
            <td align="center">{network.subgraphs ? '✓' : null}</td>
            <td align="center">{network.substreams ? '✓' : null}</td>
            <td align="center">{network.firehose ? '✓' : null}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
