import { Locale, type NestedStrings, type Translations, useI18n as useGdsI18n } from '@edgeandnode/gds'

import en from '@/pages/en/translations'

const appLocales = [Locale.ENGLISH] as const

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const supportedLocales = appLocales as Mutable<typeof appLocales>

export type AppLocale = (typeof supportedLocales)[number]

export const translations = {
  en,
} satisfies Translations & {
  [key in AppLocale]: {
    global: NestedStrings
    index: NestedStrings
    docsearch: NestedStrings
  }
}

export type AppTranslations = typeof translations

export const useI18n = () => useGdsI18n<AppTranslations>()
