import { Locale, type NestedStrings, type Translations, useI18n as _useI18n } from '@edgeandnode/gds'

import ar from '@/src/pages/ar/translations'
import cs from '@/src/pages/cs/translations'
import de from '@/src/pages/de/translations'
import en from '@/src/pages/en/translations'
import es from '@/src/pages/es/translations'
import fr from '@/src/pages/fr/translations'
import ha from '@/src/pages/ha/translations'
import hi from '@/src/pages/hi/translations'
import it from '@/src/pages/it/translations'
import ja from '@/src/pages/ja/translations'
import ko from '@/src/pages/ko/translations'
import mr from '@/src/pages/mr/translations'
import nl from '@/src/pages/nl/translations'
import pl from '@/src/pages/pl/translations'
import pt from '@/src/pages/pt/translations'
import ro from '@/src/pages/ro/translations'
import ru from '@/src/pages/ru/translations'
import sv from '@/src/pages/sv/translations'
import tr from '@/src/pages/tr/translations'
import uk from '@/src/pages/uk/translations'
import ur from '@/src/pages/ur/translations'
import vi from '@/src/pages/vi/translations'
import yo from '@/src/pages/yo/translations'
import zh from '@/src/pages/zh/translations'

const appLocales = [
  Locale.ARABIC,
  Locale.CZECH,
  // Locale.GERMAN,
  Locale.ENGLISH,
  Locale.SPANISH,
  Locale.FRENCH,
  // Locale.HAUSA,
  Locale.HINDI,
  Locale.ITALIAN,
  Locale.JAPANESE,
  // Locale.KOREAN,
  Locale.MARATHI,
  // Locale.DUTCH,
  // Locale.POLISH,
  Locale.PORTUGUESE,
  // Locale.ROMANIAN,
  Locale.RUSSIAN,
  Locale.SWEDISH,
  Locale.TURKISH,
  // Locale.UKRAINIAN,
  Locale.URDU,
  // Locale.VIETNAMESE,
  // Locale.YORUBA,
  Locale.CHINESE,
] as const

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const supportedLocales = appLocales as Mutable<typeof appLocales>

export type AppLocale = (typeof supportedLocales)[number]

export const translations = {
  ar,
  cs,
  de,
  en,
  es,
  fr,
  ha,
  hi,
  it,
  ja,
  ko,
  mr,
  nl,
  pl,
  pt,
  ro,
  ru,
  sv,
  tr,
  uk,
  ur,
  vi,
  yo,
  zh,
} satisfies Translations & {
  [key in AppLocale]: {
    global: NestedStrings
    index: NestedStrings
    docsearch: NestedStrings
    supportedNetworks: NestedStrings
  }
}

export type AppTranslations = typeof translations

export const useI18n = () => _useI18n<AppTranslations>()
