import { Locale, type NestedStrings, type Translations, useI18n as useGdsI18n } from '@edgeandnode/gds'

import ar from '@/pages/ar/translations'
import cs from '@/pages/cs/translations'
import de from '@/pages/de/translations'
import en from '@/pages/en/translations'
import es from '@/pages/es/translations'
import fr from '@/pages/fr/translations'
import hi from '@/pages/hi/translations'
import it from '@/pages/it/translations'
import ja from '@/pages/ja/translations'
import ko from '@/pages/ko/translations'
import mr from '@/pages/mr/translations'
import nl from '@/pages/nl/translations'
import pl from '@/pages/pl/translations'
import pt from '@/pages/pt/translations'
import ro from '@/pages/ro/translations'
import ru from '@/pages/ru/translations'
import sv from '@/pages/sv/translations'
import tr from '@/pages/tr/translations'
import uk from '@/pages/uk/translations'
import ur from '@/pages/ur/translations'
import vi from '@/pages/vi/translations'
import zh from '@/pages/zh/translations'

const appLocales = [
  Locale.ARABIC,
  Locale.CZECH,
  Locale.GERMAN,
  Locale.ENGLISH,
  Locale.SPANISH,
  Locale.FRENCH,
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
  zh,
} satisfies Translations & {
  [key in AppLocale]: {
    global: NestedStrings
    index: NestedStrings
    docsearch: NestedStrings
  }
}

export type AppTranslations = typeof translations

export const useI18n = () => useGdsI18n<AppTranslations>()
