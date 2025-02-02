import { NetworksRegistry } from '@pinax/graph-networks-registry'

import { Code } from '@edgeandnode/gds'

import { Table } from '@/components'
import { useI18n } from '@/i18n'

export async function getSupportedNetworks() {
  const registry = await NetworksRegistry.fromLatestVersion()

  return registry.networks
    .flatMap((network) => {
      const subgraphs = Boolean(network.services.subgraphs?.length)
      const substreams = Boolean(network.services.substreams?.length)
      const firehose = Boolean(network.services.firehose?.length)
      if (!subgraphs && !substreams && !firehose) {
        return []
      }
      return [
        {
          ...network,
          subgraphs,
          substreams,
          firehose,
        },
      ]
    })
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
              <Code.Inline>{network.id}</Code.Inline>
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
