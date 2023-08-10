import { Locale, NestedStrings, Translations, useI18n as _useI18n } from '@edgeandnode/gds'

import ar from '@/pages/ar/translations'
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
import ru from '@/pages/ru/translations'
import sv from '@/pages/sv/translations'
import tr from '@/pages/tr/translations'
import uk from '@/pages/uk/translations'
import ur from '@/pages/ur/translations'
import vi from '@/pages/vi/translations'
import zh from '@/pages/zh/translations'

const appLocales = [
  Locale.ARABIC,
  // Locale.GERMAN,
  Locale.ENGLISH,
  Locale.SPANISH,
  // Locale.FRENCH,
  Locale.HINDI,
  // Locale.ITALIAN,
  Locale.JAPANESE,
  // Locale.KOREAN,
  Locale.MARATHI,
  // Locale.DUTCH,
  // Locale.POLISH,
  Locale.PORTUGUESE,
  Locale.RUSSIAN,
  // Locale.SWEDISH,
  // Locale.TURKISH,
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

export type AppTranslations = Translations & {
  [key in AppLocale]: {
    global: NestedStrings
    index: NestedStrings
  }
}

export const translations = {
  ar,
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
  ru,
  sv,
  tr,
  uk,
  ur,
  vi,
  zh,
}

// Make sure `translations` satisfies `AppTranslations` (see https://github.com/microsoft/TypeScript/issues/7481#issuecomment-1012592893)
const _typecheck: AppTranslations = null! as typeof translations

export const useI18n = () => _useI18n<typeof translations>()
