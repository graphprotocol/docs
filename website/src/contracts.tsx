import ContractAddresses from '@graphprotocol/contracts/addresses.json'

import { getAddressLink } from '@edgeandnode/common'

import { Link, Table } from '@/components'
import { useI18n } from '@/i18n'

type ValueOf<T> = T[keyof T]
const contractsByNetworkId = ContractAddresses as Record<string, ValueOf<typeof ContractAddresses>>

export function ProtocolContractsTable({ networkId }: { networkId: number }) {
  const { t } = useI18n()
  const contracts = Object.entries(contractsByNetworkId[`${networkId}`] ?? {}).map(([name, contract]) => ({
    ...contract,
    name,
  }))
  return (
    <Table>
      <tbody>
        <tr>
          <th>{t('contracts.contract')}</th>
          <th>{t('contracts.address')}</th>
        </tr>
        {contracts.map((contract) => (
          <tr key={contract.name}>
            <td>{contract.name}</td>
            <td>
              <Link href={getAddressLink(contract.address, networkId)}>{contract.address}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
