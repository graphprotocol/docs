import { Locale, locales } from './locales'

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
