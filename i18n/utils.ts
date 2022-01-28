import { Locale, locales } from './locales'

export const localeFromString = (str: string) => {
  let bestMatch = locales[0]

  for (const locale of locales) {
    if (locale === str) {
      return locale
    } else if (str.startsWith(locale)) {
      bestMatch = locale
    }
  }

  return bestMatch
}

export const localeFromBrowser = () => {
  return localeFromString(window?.navigator?.language || locales[0])
}

export const extractLocaleFromPath = (path: string) => {
  const pathSegments = path.split('/')
  pathSegments.shift()
  const locale = (locales as string[]).includes(pathSegments[0]) ? (pathSegments.shift() as Locale) ?? null : null
  const pathWithoutLocale = `/${pathSegments.join('/')}`
  return { locale, pathWithoutLocale }
}

export const prependLocale = (path: string, locale: Locale) => {
  return `/${locale}${path}`
}

export const getPathWithLocale = (path: string, locale: Locale) => {
  const { pathWithoutLocale } = extractLocaleFromPath(path)
  return prependLocale(pathWithoutLocale, locale)
}
