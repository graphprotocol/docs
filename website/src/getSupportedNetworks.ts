import { ChainProductStatus, SupportedNetworkMap } from '@edgeandnode/common'

const isNotNull = <T>(x: T | null): x is T => x !== null

export function getSupportedNetworks() {
  return Array.from(SupportedNetworkMap.values()).flatMap((network) =>
    Array.from(network.chains)
      .map((chain) => {
        if (!chain.graphCliName) {
          return null
        } else {
          return {
            name: chain.name,
            cliName: chain.graphCliName,
            chainId: chain.chainId,
            supportedOnHosted: chain.productDeployStatus.hostedService === ChainProductStatus.ALLOWED,
            supportedOnStudio: chain.studioHosted || chain.productDeployStatus.studio === ChainProductStatus.ALLOWED,
            supportedOnNetwork: chain.networkPublishChainAllowStatusMap != null,
            isBeta: chain.graphCliName !== 'mainnet', // TODO: Include a `beta` property in `@edgeandnode/common`?
          }
        }
      })
      .filter(isNotNull)
  )
}
