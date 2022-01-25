import { merge } from 'lodash-es'

import { Translations } from './types'
import { Locale } from './locales'
import enTranslations from '@/pages/en/translations'
import arTranslations from '@/pages/ar/translations'
import koTranslations from '@/pages/ar/translations'
import zhTranslations from '@/pages/zh/translations'
import jaTranslations from '@/pages/ja/translations'
import esTranslations from '@/pages/es/translations'

export const translations: { [key in Locale]: Translations } = {
  [Locale.English]: enTranslations,
  [Locale.Arabic]: merge({}, enTranslations, arTranslations),
  [Locale.Korean]: merge({}, enTranslations, koTranslations),
  [Locale.Chinese]: merge({}, enTranslations, zhTranslations),
  [Locale.Japanese]: merge({}, enTranslations, jaTranslations),
  [Locale.Spanish]: merge({}, enTranslations, esTranslations),
}
