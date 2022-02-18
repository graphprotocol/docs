import { useContext } from 'react'

import { I18nContext, locales, localesDetails, defaultLocale, translations } from '@/i18n'

export const useI18n = () => {
  const { locale, setLocale } = useContext(I18nContext)!

  return {
    locale,
    localeDetails: localesDetails[locale],
    setLocale,
    locales,
    localesDetails,
    defaultLocale,
    translations: translations[locale],
  }
}
