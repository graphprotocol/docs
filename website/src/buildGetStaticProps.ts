import type { GetStaticProps, GetStaticPropsResult } from 'next'

import { getSupportedNetworks } from '@/src/supportedNetworks'

export const buildGetStaticProps = (fileName: string, overrides?: GetStaticProps) => {
  const getStaticProps: GetStaticProps = async (context) => {
    const overrideStaticProps: GetStaticPropsResult<Record<string, any>> = overrides
      ? await overrides(context)
      : { props: {} }
    return {
      ...overrideStaticProps,
      props: {
        ...('props' in overrideStaticProps && overrideStaticProps.props),
      },
    }
  }
  return getStaticProps
}

export const getStaticPropsForSupportedNetworks = (fileName: string) =>
  buildGetStaticProps(fileName, async () => {
    return {
      props: {
        networks: await getSupportedNetworks(),
      },
    }
  })
