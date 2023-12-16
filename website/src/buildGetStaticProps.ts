import merge from 'lodash/merge'
import { GetStaticProps } from 'next'

import { getPageMap } from '@/src/getPageMap'

type StaticProps = Awaited<ReturnType<GetStaticProps>>

export const buildGetStaticProps = (overrides?: GetStaticProps) => {
  const getStaticProps: GetStaticProps = async (context) => {
    const defaultStaticProps: StaticProps = {
      props: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        __nextra_pageMap: await getPageMap((globalThis as any).__graph_docs_locale),
      },
    }
    const overrideStaticProps: StaticProps = overrides ? await overrides(context) : { props: {} }
    const staticProps: StaticProps = merge(defaultStaticProps, overrideStaticProps)
    return staticProps
  }
  return getStaticProps
}
