import { useContext } from 'react'

import {
  I18nContext,
  I18nContextDataDefaults,
  locales,
  localesDetails,
  defaultLocale,
  translations,
  extractLocaleFromPath,
} from '@/i18n'

export const useI18n = () => {
  let contextData = useContext(I18nContext)

  if (!contextData) {
    contextData = I18nContextDataDefaults
  }

  const { locale, setLocale, pathWithoutLocale } = contextData

  return {
    locale,
    localeDetails: localesDetails[locale],
    setLocale,
    pathWithoutLocale,
    locales,
    localesDetails,
    defaultLocale,
    translations: translations[locale],
    extractLocaleFromPath,
  }
}
