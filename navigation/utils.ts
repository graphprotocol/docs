import { defaultLocale } from '@edgeandnode/components'

import { NavItem, NavItemDefinition, NavItemPromise, NavItemPage } from './types'
import { navigation } from './navigation'
import { Frontmatter } from '@/layout'
import { AppLocale } from '@/i18n'

const navItemsPromiseByLocale: { [key in AppLocale]?: Promise<NavItem[]> } = {}

export const getNavItems = async (locale: AppLocale = defaultLocale): Promise<NavItem[]> => {
  let navItemsPromise = navItemsPromiseByLocale[locale]

  if (!navItemsPromise) {
    const definitions = navigation(locale)

    navItemsPromise = (async () => {
      const handleDefinition = (definition: NavItemDefinition, parentPath?: string): NavItemPromise => {
        if ('divider' in definition) {
          return definition
        }
        const path = `${parentPath ?? ''}/${definition.slug}`
        const children: NavItemPromise[] = []
        const isGroup = 'children' in definition
        if (isGroup) {
          for (const childDefinition of definition.children) {
            children.push(handleDefinition(childDefinition, path))
          }
        }
        return (async () => {
          let title = definition.title
          if (!isGroup) {
            const filePath = `${path}${path.endsWith('/') ? 'index' : ''}`
            const filesToTry = [`${locale}${filePath}.mdx`, `${locale}${filePath}.tsx`, `[locale]${filePath}.tsx`]
            let currentTry = 0
            while (true) {
              try {
                const fileToTry = filesToTry[currentTry]
                const { frontmatter }: { frontmatter?: Frontmatter | ((locale: AppLocale) => Frontmatter) } =
                  await import(`../pages/${fileToTry}`)
                if (!title && frontmatter) {
                  const frontmatterData = typeof frontmatter === 'function' ? frontmatter(locale) : frontmatter
                  title = frontmatterData.navTitle ?? frontmatterData.title
                }
                break
              } catch (error) {
                currentTry++
                if (currentTry >= filesToTry.length) {
                  return null
                }
              }
            }
          }
          title = title ?? '[MISSING TITLE]'
          const handledDefinition = {
            ...definition,
            title,
            path,
          }
          if (isGroup) {
            return {
              ...handledDefinition,
              children,
            }
          }
          return handledDefinition
        })()
      }

      const promises: NavItemPromise[] = []
      for (const definition of definitions) {
        promises.push(handleDefinition(definition))
      }

      const handlePromise = async (promise: NavItemPromise): Promise<NavItem | null> => {
        const item = await promise
        if (item === null) {
          return null
        }
        if ('children' in item) {
          const children: NavItemPage[] = []
          for (const childPromise of item.children) {
            const child = await handlePromise(childPromise)
            if (child !== null) {
              children.push(child as NavItemPage)
            }
          }
          return {
            ...item,
            children,
          }
        }
        return item
      }

      const items: (NavItem | null)[] = []
      for (const promise of promises) {
        items.push(await handlePromise(promise))
      }

      let lastFilteredItem: NavItem | null = null
      const filteredItems: NavItem[] = items.filter((item) => {
        // Item is a page that doesn't exist in that locale
        if (item === null) {
          return false
        }
        // Item is a group with no existing pages in that locale
        if ('children' in item && item.children.length === 0) {
          return false
        }
        // Item is a divider that directly follows another divider due to missing pages/groups
        if ('divider' in item && lastFilteredItem !== null && 'divider' in lastFilteredItem) {
          return false
        }
        lastFilteredItem = item
        return true
      }) as NavItem[]

      // If the filtered items start with a divider due to missing pages/groups, remove it
      if (filteredItems.length > 0 && 'divider' in (filteredItems[0] as NavItem)) {
        filteredItems.shift()
      }

      // If the filtered items end with a divider due to missing pages/groups, remove it
      if (filteredItems.length > 0 && 'divider' in (filteredItems[filteredItems.length - 1] as NavItem)) {
        filteredItems.pop()
      }

      return filteredItems
    })()

    navItemsPromiseByLocale[locale] = navItemsPromise
  }

  return navItemsPromise
}
