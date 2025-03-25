import type { NextSeoProps } from 'next-seo'
import type { Heading, ReadingTime } from 'nextra'
import type { normalizePages } from 'nextra/normalize-pages'
import { createContext } from 'react'
import { z } from 'zod'

export const MAX_HEADING_DEPTH = 3

export const templateOptionsSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('default') }),
  z.object({ type: z.literal('openApi'), apiId: z.string(), operationId: z.string() }),
])

export type TemplateOptions = z.infer<typeof templateOptionsSchema>

export type FrontMatter = {
  title?: string
  description?: string
  socialImage?: string
  seo?: NextSeoProps
  remotePageUrl?: string
  hideTableOfContents?: boolean
  hideContentHeader?: boolean
  hideContentFooter?: boolean
  unwrapContent?: boolean
  template?: unknown
}

export type LayoutContextProps = {
  filePath: string
  frontMatter: FrontMatter
  template: TemplateOptions
  lastUpdated: Date | null
  readingTime: ReadingTime | null
  remotePageUrl: string | null
  // TODO: Replace the following by a more cleaned up `navigation` object
  flatDocsDirectories: ReturnType<typeof normalizePages>['flatDocsDirectories']
  activeIndex: ReturnType<typeof normalizePages>['activeIndex']
  activePath: ReturnType<typeof normalizePages>['activePath']
}

export const LayoutContext = createContext<LayoutContextProps | null>(null)

export type MDXContentContextProps = {
  headings: Heading[]
  markHeading: (id: string, inOrAboveView: boolean) => void
  headingIsInOrAboveView: (id: string) => boolean
}

export const MDXContentContext = createContext<MDXContentContextProps | null>(null)
