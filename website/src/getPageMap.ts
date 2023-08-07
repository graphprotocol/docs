import { Folder, MetaJsonFile, PageMapItem } from 'nextra'
import { buildDynamicMeta } from 'nextra/remote'

import { Locale, translate } from '@edgeandnode/gds'

import { translations } from '@/i18n'

export async function getPageMap(locale: Locale = Locale.ENGLISH) {
  const { __nextra_pageMap } = await buildDynamicMeta()

  const pageMap = __nextra_pageMap!.find(
    (pageItem): pageItem is Folder => pageItem.kind === 'Folder' && pageItem.name === (locale as string),
  )!.children

  const resultPageMap = [
    ...pageMap,
    // add missing dynamic "[locale]/index.mdx" page
    { kind: 'MdxPage', name: 'index', route: `/${locale}` },
  ]

  const metaIndex = pageMap.findIndex((pageItem) => pageItem.kind === 'Meta')
  ;(resultPageMap[metaIndex] as MetaJsonFile).data.index = translate(translations, locale, 'index.title')

  return resultPageMap
}
