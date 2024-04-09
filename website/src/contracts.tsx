import { Table } from '@graphprotocol/nextra-theme'
import ContractAddresses from '@graphprotocol/contracts/addresses.json'

export function ProtocolContractsTable({networkId, blockExplorer}: {networkId: keyof typeof ContractAddresses, blockExplorer: string}) {

  const contracts = ContractAddresses[networkId]
  return (
    <Table>
      <tbody>
        <tr>
          <th>{'Contract'}</th>
          <th align="center">{'Address'}</th>
        </tr>
        {Object.entries(contracts).map(([contract, info]) => {
          return (<tr key={contract}>
            <td>{contract}</td>
            <td align="center">{<a href={`https://${blockExplorer}/address/${info.address}`} target='_blank' >{info.address}</a>}</td>
          </tr>)
        })}
      </tbody>
    </Table>
  )
}
