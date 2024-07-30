import type { NextSeoProps } from 'next-seo'
import type { ReadingTime } from 'nextra'
import { createContext } from 'react'

export type Frontmatter = {
  title?: string
  description?: string
  socialImage?: string
  seo?: NextSeoProps
}

export type DocumentContextProps = {
  frontMatter: Frontmatter
  markOutlineItem: (id: string, inOrAboveView: boolean) => void
  outlineItemIsInOrAboveView: (key: string) => boolean
  timestamp?: number
  readingTime?: ReadingTime
}

export const DocumentContext = createContext<DocumentContextProps | null>(null)
