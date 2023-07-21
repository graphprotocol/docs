import { ChainProductStatus, SupportedNetworkMap } from '@edgeandnode/common'

const isNotNull = <T>(x: T | null): x is T => x !== null

export function getSupportedNetworks() {
  return Array.from(SupportedNetworkMap.values()).flatMap((network) =>
    Array.from(network.chains)
      .map((chain) => {
        if (!chain.graphCliName) {
          return null
        }

        const supportedOnHosted = chain.productDeployStatus.hostedService === ChainProductStatus.ALLOWED
        const supportedOnStudio = chain.studioHosted || chain.productDeployStatus.studio === ChainProductStatus.ALLOWED
        const supportedOnNetwork = chain.networkPublishChainAllowStatusMap != null && !chain.testnet

        if (!supportedOnHosted && !supportedOnStudio && !supportedOnNetwork) {
          return null
        }

        return {
          name: chain.name,
          cliName: chain.graphCliName,
          chainId: chain.chainId,
          supportedOnHosted,
          supportedOnStudio,
          supportedOnNetwork,
          substreams: chain.substreams,
          isBeta: chain.graphCliName !== 'mainnet', // TODO: Include a `beta` property in `@edgeandnode/common`?
        }
      })
      .filter(isNotNull),
  )
}
