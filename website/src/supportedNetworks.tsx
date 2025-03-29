import { NetworksRegistry } from '@pinax/graph-networks-registry'

import { Table } from '@/components'
import { useI18n } from '@/i18n'
import { NetworkIcon } from '@edgeandnode/go'
import { Check } from '@edgeandnode/gds/icons'
import { Text } from '@edgeandnode/gds'

// Networks that should use the "mono" icon variant
const MONO_ICON_NETWORKS = [
  'vana',
  'vana-moksha',
  'xlayer-mainnet',
  'xlayer-sepolia',
  'zksync-era',
  'zksync-era-sepolia',
  'sonic',
  'soneium-testnet',
  'soneium',
  'linea-sepolia',
  'linea',
  'lens-testnet',
  'expchain-testnet',
  'autonomys-taurus',
  'arweave-mainnet',
  'fraxtal',
  'lumia',
  'mbase',
]

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

  const getIconVariant = (networkId: string) => {
    return MONO_ICON_NETWORKS.includes(networkId) ? 'mono' : 'branded'
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th>
            <Text.C10>{t('supportedNetworks.name')}</Text.C10>
          </th>
          <th>
            <Text.C10>{t('supportedNetworks.id')}</Text.C10>
          </th>
          <th align="center">
            <Text.C10>{t('supportedNetworks.subgraphs')}</Text.C10>
          </th>
          <th align="center">
            <Text.C10>{t('supportedNetworks.substreams')}</Text.C10>
          </th>
          <th align="center">
            <Text.C10>{t('supportedNetworks.firehose')}</Text.C10>
          </th>
          <th align="center">
            <Text.C10>{t('supportedNetworks.tokenapi')}</Text.C10>
          </th>
        </tr>
        {networks.map((network) => (
          <tr key={network.id}>
            <td>
              <div className="flex items-center gap-2">
                <NetworkIcon variant={getIconVariant(network.id)} caip2Id={network.caip2Id as any} size={5} />
                <Text.P14>{network.shortName}</Text.P14>
              </div>
            </td>
            <td>
              <Text.P14>{network.id}</Text.P14>
            </td>
            <td align="center">{network.subgraphs ? <Check size={4} /> : null}</td>
            <td align="center">{network.substreams ? <Check size={4} /> : null}</td>
            <td align="center">{network.firehose ? <Check size={4} /> : null}</td>
            <td align="center">{network.tokenapi ? <Check size={4} /> : null}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
