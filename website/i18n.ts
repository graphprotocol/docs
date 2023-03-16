import { Locale, NestedStrings, Translations, useI18n as _useI18n } from '@edgeandnode/components'

import ar from './pages/ar/translations'
import en from './pages/en/translations'
import es from './pages/es/translations'
import ja from './pages/ja/translations'
import ko from './pages/ko/translations'
import vi from './pages/vi/translations'
import zh from './pages/zh/translations'

const appLocales = [
  Locale.ARABIC,
  Locale.ENGLISH,
  Locale.SPANISH,
  Locale.JAPANESE,
  Locale.KOREAN,
  Locale.VIETNAMESE,
  Locale.CHINESE,
] as const

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const supportedLocales = appLocales as Mutable<typeof appLocales>

export type AppLocale = (typeof supportedLocales)[number]

export type AppTranslations = Translations & {
  [key in AppLocale]: {
    global: NestedStrings
    index: NestedStrings
  }
}

export const translations = {
  ar,
  en,
  es,
  ja,
  ko,
  vi,
  zh,
}

// Make sure `translations` satisfies `AppTranslations` (see https://github.com/microsoft/TypeScript/issues/7481#issuecomment-1012592893)
const _typecheck: AppTranslations = null! as typeof translations

export const useI18n = () => _useI18n<typeof translations>()
