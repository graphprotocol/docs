import { MetaJsonFile, PageMapItem } from 'nextra'
import { buildDynamicMeta } from 'nextra/remote'

import { Locale, translate } from '@edgeandnode/gds'

import { supportedLocales, translations } from '@/i18n'

export async function getPageMap(locale: Locale = Locale.ENGLISH) {
  if (!(supportedLocales as Locale[]).includes(locale)) {
    return []
  }

  const { __nextra_pageMap } = await buildDynamicMeta()

  const resultPageMap: PageMapItem[] = [
    ...__nextra_pageMap,
    // add missing dynamic "[locale]/index.mdx" page
    { kind: 'MdxPage', name: 'index', route: `/${locale}` },
  ]

  const metaIndex = __nextra_pageMap.findIndex((pageItem) => pageItem.kind === 'Meta')
  ;(resultPageMap[metaIndex] as MetaJsonFile).data.index = translate(translations, locale, 'index.title')

  return resultPageMap
}
