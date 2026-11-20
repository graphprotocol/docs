import HorizonAddresses from '@graphprotocol/address-book/horizon/addresses.json'
import IssuanceAddresses from '@graphprotocol/address-book/issuance/addresses.json'
import SubgraphServiceAddresses from '@graphprotocol/address-book/subgraph-service/addresses.json'
import ContractAddresses from '@graphprotocol/contracts/addresses.json'

import { getAddressLink } from '@edgeandnode/common'
import { ExperimentalLink } from '@edgeandnode/gds'

import { Table } from '@/components'
import { useI18n } from '@/i18n'

type ValueOf<T> = T[keyof T]

/**
 * Legacy protocol contracts (Ethereum Mainnet, Sepolia) sourced from `@graphprotocol/contracts`.
 * The new Horizon deployments on Arbitrum live in `@graphprotocol/address-book` (see below).
 */
const contractsByNetworkId = ContractAddresses as Record<string, ValueOf<typeof ContractAddresses>>

/**
 * Horizon-era contracts (Arbitrum One, Arbitrum Sepolia) sourced from `@graphprotocol/address-book`.
 * Each package file is keyed by chain ID, then by contract name. Reading straight from the package
 * means new deployments are picked up automatically whenever the dependency is bumped.
 */
type AddressBookEntry = { address: string }
type AddressBook = Record<string, Record<string, AddressBookEntry>>

export const addressBookPackages = {
  horizon: HorizonAddresses as AddressBook,
  'subgraph-service': SubgraphServiceAddresses as AddressBook,
  issuance: IssuanceAddresses as AddressBook,
}

export type AddressBookPackage = keyof typeof addressBookPackages

/** Shared name + address table used by both the legacy and address-book sources. */
function ContractsTable({
  networkId,
  contracts,
}: {
  networkId: number
  contracts: { name: string; address: string }[]
}) {
  const { t } = useI18n()
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
              <ExperimentalLink href={getAddressLink(contract.address, networkId)}>{contract.address}</ExperimentalLink>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

/** Legacy protocol contracts for a given network, from `@graphprotocol/contracts`. */
export function ProtocolContractsTable({ networkId }: { networkId: number }) {
  const contracts = Object.entries(contractsByNetworkId[`${networkId}`] ?? {}).map(([name, contract]) => ({
    name,
    address: contract.address,
  }))
  return <ContractsTable networkId={networkId} contracts={contracts} />
}

/** Horizon-era contracts for a given network and package, from `@graphprotocol/address-book`. */
export function HorizonContractsTable({ networkId, product }: { networkId: number; product: AddressBookPackage }) {
  const contracts = Object.entries(addressBookPackages[product][`${networkId}`] ?? {}).map(([name, contract]) => ({
    name,
    address: contract.address,
  }))
  if (contracts.length === 0) return null
  return <ContractsTable networkId={networkId} contracts={contracts} />
}
