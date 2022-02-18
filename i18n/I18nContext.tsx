import { createContext, Context, PropsWithChildren } from 'react'

import { Locale, defaultLocale } from './locales'

export type I18nContextData = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const I18nContext = createContext(null) as Context<I18nContextData | null>

export type I18nContextProviderProps = Partial<I18nContextData>

export const I18nContextProvider = ({
  locale = defaultLocale,
  setLocale = () => {},
  children,
}: PropsWithChildren<I18nContextProviderProps>) => {
  return <I18nContext.Provider value={{ locale, setLocale }}>{children}</I18nContext.Provider>
}
