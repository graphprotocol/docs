import { createContext, Context, PropsWithChildren } from 'react'

import { Locale, defaultLocale } from './locales'

export type I18nContextData = {
  locale: Locale
  setLocale: (locale: Locale) => void
  pathWithoutLocale: string
}

export const I18nContext = createContext(null) as Context<I18nContextData | null>

export const I18nContextDataDefaults: I18nContextData = {
  locale: defaultLocale,
  setLocale: () => {},
  pathWithoutLocale: '',
}

export type I18nContextProviderProps = Partial<I18nContextData>

export const I18nContextProvider = ({
  locale = I18nContextDataDefaults.locale,
  setLocale = I18nContextDataDefaults.setLocale,
  pathWithoutLocale = I18nContextDataDefaults.pathWithoutLocale,
  children,
}: PropsWithChildren<I18nContextProviderProps>) => {
  return <I18nContext.Provider value={{ locale, setLocale, pathWithoutLocale }}>{children}</I18nContext.Provider>
}
