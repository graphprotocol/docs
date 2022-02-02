import { PropsWithChildren, createContext, Context, useMemo, useCallback } from 'react'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import { ThemeUIStyleObject } from 'theme-ui'
import { NewGDSDivider, NewGDSDividerProps, Spacing, Flex } from '@edgeandnode/components'
import { useSet } from 'react-use'

import { NavItem, NavItemPage } from '@/navigation'
import { MDXLayoutNav, MDXLayoutPagination, MDXLayoutOutline } from '@/layout'
import {
  Blockquote,
  CodeBlock,
  CodeInline,
  EditPageLink,
  Heading,
  Image,
  LinkInline,
  ListOrdered,
  ListUnordered,
  Paragraph,
  Table,
} from '@/components'
import { useI18n } from '@/hooks'

const mdxComponents = {
  blockquote: Blockquote,
  pre: CodeBlock,
  code: CodeInline,
  hr: (props: NewGDSDividerProps) => <NewGDSDivider sx={{ my: Spacing.XL }} {...props} />,
  h1: Heading.H1,
  h2: Heading.H2,
  h3: Heading.H3,
  h4: Heading.H4,
  h5: Heading.H5,
  h6: Heading.H6,
  img: Image,
  a: LinkInline,
  ol: ListOrdered,
  ul: ListUnordered,
  p: Paragraph,
  table: Table,
}

const mdxStyles = {
  overflowWrap: 'break-word',
  'img + em': {
    mt: Spacing.L,
    display: 'block',
    textAlign: 'center',
  },
  '.video-container': {
    paddingBottom: `${100 / (16 / 9)}%`,
  },
  '.video-iframe': {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
} as ThemeUIStyleObject

export type NavContextProps = {
  navItems: NavItem[]
  pageNavItems: NavItemPage[]
  previousPage: NavItemPage | null
  currentPage: NavItemPage | null
  nextPage: NavItemPage | null
}

export const NavContext = createContext(null) as Context<NavContextProps | null>

export type Frontmatter = {
  title?: string
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

export type MDXLayoutProps = PropsWithChildren<
  Pick<NavContextProps, 'navItems'> & Pick<DocumentContextProps, 'frontmatter' | 'outline'>
>

export const MDXLayout = ({ navItems, frontmatter, outline, children }: MDXLayoutProps) => {
  const { currentPathWithoutLocale } = useI18n()

  // Compute some values for the `NavContext`
  const { pageNavItems, previousPage, currentPage, nextPage } = useMemo(() => {
    let previousPage = null
    let currentPage = null
    let nextPage = null
    const pageNavItems = navItems.flatMap((navItem) => {
      if ('children' in navItem) {
        return navItem.children.filter((childNavItem) => 'path' in childNavItem)
      }
      if ('path' in navItem) {
        return [navItem]
      }
      return []
    })
    let pageNavItemIndex = 0
    for (const pageNavItem of pageNavItems) {
      if (pageNavItem.path === currentPathWithoutLocale) {
        previousPage = pageNavItems[pageNavItemIndex - 1] ?? null
        currentPage = pageNavItems[pageNavItemIndex] ?? null
        nextPage = pageNavItems[pageNavItemIndex + 1] ?? null
      }
      pageNavItemIndex++
    }
    return { pageNavItems, previousPage, currentPage, nextPage }
  }, [navItems, currentPathWithoutLocale])

  // Provide `markOutlineItem` to the `DocumentContext` so child `Heading` components can mark outline items as "in or above view" or not
  const [
    ,
    { add: markOutlineItemAsInOrAboveView, remove: markOutlineItemAsNotInOrAboveView, has: outlineItemIsInOrAboveView },
  ] = useSet(new Set([]) as Set<string>)

  const markOutlineItem = useCallback(
    (id: string, inOrAboveView: boolean) => {
      if (inOrAboveView) {
        markOutlineItemAsInOrAboveView(id)
      } else {
        markOutlineItemAsNotInOrAboveView(id)
      }
    },
    [markOutlineItemAsInOrAboveView, markOutlineItemAsNotInOrAboveView]
  )

  // Compute `highlightedOutlineItemId` for the `DocumentContext` based on outline items that have been marked as "in or above view"
  const highlightedOutlineItemId = useMemo(() => {
    let _highlightedOutlineItemId = null
    for (const outlineItem of outline) {
      if (outlineItem.level <= 3 && outlineItemIsInOrAboveView(outlineItem.id)) {
        _highlightedOutlineItemId = outlineItem.id
      }
    }
    return _highlightedOutlineItemId
  }, [outline, outlineItemIsInOrAboveView])

  return (
    <NavContext.Provider value={{ navItems, pageNavItems, previousPage, currentPage, nextPage }}>
      <DocumentContext.Provider value={{ frontmatter, outline, markOutlineItem, highlightedOutlineItemId }}>
        <Head>
          <title>{frontmatter?.title ? `${frontmatter.title} - ` : ''}The Graph Docs</title>
        </Head>

        <div
          sx={{
            display: ['flex', null, null, 'grid'],
            gridTemplateColumns: '216px auto 216px',
            flexDirection: 'column',
          }}
        >
          <div sx={{ display: ['none', null, null, 'block'], ml: '-8px', mr: '24px' }}>
            <MDXLayoutNav />
          </div>

          <div
            sx={{
              pt: [null, null, null, Spacing.XL],
              pb: Spacing.XXL,
            }}
          >
            <div sx={{ display: [null, null, null, 'none'], mb: Spacing.XL }}>
              <MDXLayoutNav mobile />
            </div>

            <div sx={mdxStyles}>
              {frontmatter?.title && <Heading.H1>{frontmatter.title}</Heading.H1>}
              <MDXProvider components={mdxComponents}>{children}</MDXProvider>
            </div>

            <Flex.Row sx={{ display: [null, null, null, 'none'], mt: Spacing.XL_XXL }}>
              <EditPageLink mobile />
            </Flex.Row>

            <div sx={{ mt: Spacing.XXL }}>
              <MDXLayoutPagination />
            </div>
          </div>

          <div sx={{ display: ['none', null, null, 'block'], ml: '40px', mr: '-8px' }}>
            <MDXLayoutOutline />
          </div>
        </div>
      </DocumentContext.Provider>
    </NavContext.Provider>
  )
}
