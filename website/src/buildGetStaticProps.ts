import path from 'path'

import type { GetStaticProps, GetStaticPropsResult } from 'next'

import { Locale } from '@edgeandnode/gds'

import { getPageMap } from '@/src/getPageMap'
import { getSupportedNetworks } from '@/src/supportedNetworks'

export const buildGetStaticProps = (fileName: string, overrides?: GetStaticProps) => {
  const getStaticProps: GetStaticProps = async (context) => {
    const overrideStaticProps: GetStaticPropsResult<Record<string, any>> = overrides
      ? await overrides(context)
      : { props: {} }

    const pagesDir = path.join(process.cwd(), '.next', 'server', 'pages')
    const pagePath = path.relative(pagesDir, fileName)
    const locale = pagePath.slice(0, 2) as Locale

    return {
      ...overrideStaticProps,
      props: {
        ...('props' in overrideStaticProps && overrideStaticProps.props),
        __nextra_pageMap: await getPageMap(locale),
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
