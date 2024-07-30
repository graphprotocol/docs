import { normalizePages } from 'nextra/normalize-pages'
import { createContext } from 'react'

type NavContextProps = {
  filePath: string
} & ReturnType<typeof normalizePages>

export const NavContext = createContext<NavContextProps | null>(null)
