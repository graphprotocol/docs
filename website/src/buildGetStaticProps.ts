import { GetStaticProps, GetStaticPropsResult } from 'next'

import { getPageMap } from '@/src/getPageMap'
import { getSupportedNetworks } from '@/src/supportedNetworks'

export const buildGetStaticProps = (overrides?: GetStaticProps) => {
  const getStaticProps: GetStaticProps = async (context) => {
    const overrideStaticProps: GetStaticPropsResult<Record<string, any>> = overrides
      ? await overrides(context)
      : { props: {} }

    return {
      ...overrideStaticProps,
      props: {
        ...('props' in overrideStaticProps && overrideStaticProps.props),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        __nextra_pageMap: await getPageMap(globalThis.__graph_docs_locale),
      },
    }
  }
  return getStaticProps
}

export const getStaticPropsForSupportedNetworks = buildGetStaticProps(async () => {
  return {
    props: {
      networks: await getSupportedNetworks(),
    },
  }
})
