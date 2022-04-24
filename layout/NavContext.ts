import { createContext, Context } from 'react'

import { NavItem, NavItemPage } from '@/navigation'

export type NavContextProps = {
  pagePath: string
  navItems: NavItem[]
  pageNavItems: NavItemPage[]
  previousPage: NavItemPage | null
  currentPage: NavItemPage | null
  nextPage: NavItemPage | null
}

export const NavContext = createContext(null) as Context<NavContextProps | null>
