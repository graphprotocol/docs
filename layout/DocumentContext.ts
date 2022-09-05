import { NextSeoProps } from 'next-seo'
import { Context, createContext } from 'react'

export type Frontmatter = {
  title?: string
  navTitle?: string
  seo?: NextSeoProps
}

export type OutlineItem = {
  id: string
  title: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export type DocumentContextProps = {
  frontmatter?: Frontmatter
  outline: OutlineItem[]
  markOutlineItem: (id: string, inOrAboveView: boolean) => void
  highlightedOutlineItemId: string | null
}

export const DocumentContext = createContext(null) as Context<DocumentContextProps | null>
