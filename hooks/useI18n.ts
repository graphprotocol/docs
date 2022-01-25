import { useCallback } from 'react'
import { useRouter } from 'next/router'

import {
  Locale,
  locales,
  localesDetails,
  defaultLocale,
  extractLocaleFromPath,
  prependLocale,
  getPathWithLocale,
  translations,
} from '@/i18n'

export const useI18n = () => {
  const router = useRouter()
  const currentPath = router.asPath.split(/[?#]/)[0].replace(/\/$/, '')
  const { locale, pathWithoutLocale: currentPathWithoutLocale } = extractLocaleFromPath(currentPath)
  const currentLocale = locale ?? defaultLocale
  const currentLocaleDetails = localesDetails[currentLocale]

  const setLocale = useCallback(
    (locale: Locale) => {
      router.push(prependLocale(currentPathWithoutLocale, locale))
    },
    [router, currentPathWithoutLocale]
  )

  const getPathWithCurrentLocale = useCallback(
    (path: string) => {
      return getPathWithLocale(path, currentLocale)
    },
    [currentLocale]
  )

  return {
    locales,
    localesDetails,
    defaultLocale,
    currentLocale,
    currentLocaleDetails,
    currentPath,
    currentPathWithoutLocale,
    setLocale,
    extractLocaleFromPath,
    getPathWithLocale,
    getPathWithCurrentLocale,
    translations: translations[currentLocale],
  }
}
