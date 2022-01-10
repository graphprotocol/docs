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
} from '@/locale'

export const useLocale = () => {
  const router = useRouter()
  const currentPath = router.pathname
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
  }
}
