import { ChainProductStatus, SupportedNetworkMap } from '@edgeandnode/common'

const categories = ['studio', 'hostedService'] as const

type Category = (typeof categories)[number]

const isNotNull = <T>(x: T | null): x is T => x !== null

export function getSupportedNetworks(category: Category) {
  return Array.from(SupportedNetworkMap.values()).flatMap((network) =>
    Array.from(network.chains)
      .filter((chain) => {
        // Don't return chains that are not supported in this category
        if (chain.productDeployStatus[category] !== ChainProductStatus.ALLOWED) {
          return false
        }
        // Don't repeat the chains that are supported in Studio in the Hosted Service category
        // eslint-disable-next-line sonarjs/prefer-single-boolean-return
        if (category === 'hostedService' && chain.productDeployStatus['studio'] === ChainProductStatus.ALLOWED) {
          return false
        }
        return true
      })
      .map((chain) => {
        if (!chain.graphCliName) {
          return null
        } else {
          return {
            name: chain.name,
            cliName: chain.graphCliName,
            beta: chain.graphCliName !== 'mainnet', // TODO: Include a `beta` property in `@edgeandnode/common`?
          }
        }
      })
      .filter(isNotNull)
  )
}
