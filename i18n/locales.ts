import { LocaleDetails } from './types'

export enum Locale {
  English = 'en',
  Arabic = 'ar',
  Korean = 'ko',
  Chinese = 'zh',
  Japanese = 'ja',
  Spanish = 'es',
}

export const locales = Object.values(Locale)

export const localesDetails: {
  [key in Locale]: LocaleDetails
} = {
  [Locale.English]: {
    displayName: 'English',
    shortName: 'EN',
  },
  [Locale.Arabic]: {
    displayName: 'العربية',
    shortName: 'AR',
  },
  [Locale.Korean]: {
    displayName: '한국어',
    shortName: 'KO',
  },
  [Locale.Chinese]: {
    displayName: '中文',
    shortName: 'ZH',
  },
  [Locale.Japanese]: {
    displayName: '日本語',
    shortName: 'JA',
  },
  [Locale.Spanish]: {
    displayName: 'Español',
    shortName: 'ES',
  },
}

export const defaultLocale = Locale.English
