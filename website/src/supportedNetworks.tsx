import { CodeInline, Table } from '@graphprotocol/nextra-theme'
import type { ExecutionResult } from 'graphql'

import { ChainProductStatus, SupportedNetworkMap } from '@edgeandnode/common'

import { execute, SupportedNetworksDocument, type SupportedNetworksQuery } from '@/.graphclient'
import { useI18n } from '@/i18n'

export async function getSupportedNetworks() {
  // Get the IDs of the networks that are fully supported (as opposed to supported only by the upgrade indexer) using the EBO subgraph
  const supportedNetworksQueryResult: ExecutionResult<SupportedNetworksQuery> = await execute(SupportedNetworksDocument)
  const fullySupportedNetworkIds = (supportedNetworksQueryResult.data?.networks ?? []).map((network) => network.id)

  // Fallback in case the GraphQL query fails (last updated 2024-06-04)
  if (fullySupportedNetworkIds.length === 0) {
    fullySupportedNetworkIds.push(
      'eip155:1',
      'eip155:100',
      'eip155:137',
      'eip155:250',
      'eip155:42161',
      'eip155:42220',
      'eip155:43114',
      'eip155:10',
    )
  }

  return Array.from(SupportedNetworkMap.values()).flatMap((network) =>
    Array.from(network.chains)
      .flatMap((chain) => {
        const supportedOnStudio = chain.productDeployStatus.studio === ChainProductStatus.ALLOWED
        const integrationType = ['evm', 'near', 'cosmos', 'osmosis', 'ar'].includes(chain.network)
          ? chain.network
          : 'substreams'

        if (
          !chain.graphCliName ||
          (!supportedOnStudio && integrationType !== 'substreams') ||
          chain.uid === 'evm-1946'
        ) {
          return []
        }

        const fullySupportedOnNetwork =
          network.id === 'evm' && fullySupportedNetworkIds.includes(`eip155:${chain.chainId}`)

        return [
          {
            uid: chain.uid,
            name: chain.name,
            cliName: chain.graphCliName,
            chainId: chain.chainId,
            testnet: chain.testnet,
            supportedOnStudio,
            fullySupportedOnNetwork,
            substreams: chain.substreams ?? [],
            integrationType,
          },
        ]
      })
      .filter(Boolean),
  )
}

export function SupportedNetworksTable({ networks }: { networks: Awaited<ReturnType<typeof getSupportedNetworks>> }) {
  const { t } = useI18n()

  return (
    <Table>
      <tbody>
        <tr>
          <th>{t('supportedNetworks.network')}</th>
          <th>{t('supportedNetworks.cliName')}</th>
          <th align="center">{t('supportedNetworks.integrationType')}**</th>
          <th align="center">{t('supportedNetworks.subgraphStudio')}</th>
          <th align="center">{t('supportedNetworks.decentralizedNetwork')}</th>
        </tr>
        {networks.map((network) => (
          <tr key={network.cliName}>
            <td>{network.name}</td>
            <td>
              <CodeInline>{network.cliName}</CodeInline>
            </td>
            <td align="center">{network.integrationType}</td>
            <td align="center">
              {network.supportedOnStudio ? '✓' : null}
              {network.substreams.includes('studio') ? <sup>†</sup> : null}
            </td>
            <td align="center">
              {network.fullySupportedOnNetwork ? '✓' : null}
              {!network.fullySupportedOnNetwork && network.supportedOnStudio ? '*' : null}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
