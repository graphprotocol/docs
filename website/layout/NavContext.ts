import { Context, createContext } from 'react'

import { NavItem, NavItemGroup, NavItemPage } from '../navigation'

export type NavContextProps = {
  pagePath: string
  navItems: NavItem[]
  previousPage: NavItemPage | null
  currentPage: NavItemPage | null
  nextPage: NavItemPage | null
  currentGroup: NavItemGroup | null
}

export const NavContext = createContext(null) as Context<NavContextProps | null>
