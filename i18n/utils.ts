import { Locale, locales } from './locales'

export const extractLocaleFromPath = (path: string) => {
  const pathSegments = path.split('/').filter(Boolean)
  const locale = (locales as string[]).includes(pathSegments[0]) ? (pathSegments.shift() as Locale) ?? null : null
  const pathWithoutLocale = `/${pathSegments.join('/')}`
  return { locale, pathWithoutLocale }
}
