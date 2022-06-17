import { PropsWithChildren, useMemo, useCallback } from 'react'
import { NextSeo } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'
import { ThemeUIStyleObject } from 'theme-ui'
import { NewGDSDivider, NewGDSDividerProps, Spacing, Flex } from '@edgeandnode/components'
import { useSet } from 'react-use'

import {
  NavContext,
  NavContextProps,
  DocumentContext,
  DocumentContextProps,
  MDXLayoutNav,
  MDXLayoutPagination,
  MDXLayoutOutline,
} from '@/layout'
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
import { useI18n } from '@/i18n'
import { NavItemGroup } from '@/navigation'

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

export type MDXLayoutProps = PropsWithChildren<
  Pick<NavContextProps, 'pagePath' | 'navItems'> & Pick<DocumentContextProps, 'frontmatter' | 'outline'>
>

export const MDXLayout = ({ pagePath, navItems, frontmatter, outline, children }: MDXLayoutProps) => {
  const { pathWithoutLocale } = useI18n()

  // Compute some values for the `NavContext`
  const { previousPage, currentPage, nextPage, currentGroup } = useMemo(() => {
    let previousPage = null
    let currentPage = null
    let nextPage = null
    let currentGroup = null
    const pageNavItems = navItems.flatMap((navItem) => {
      if ('children' in navItem) {
        return navItem.children.filter((childNavItem) => {
          if ('path' in childNavItem) {
            if (childNavItem.path === pathWithoutLocale) {
              currentGroup = navItem
            }
            return true
          }
        })
      }
      if ('path' in navItem) {
        return [navItem]
      }
      return []
    })
    let pageNavItemIndex = 0
    for (const pageNavItem of pageNavItems) {
      if (pageNavItem.path === pathWithoutLocale) {
        previousPage = pageNavItems[pageNavItemIndex - 1] ?? null
        currentPage = pageNavItems[pageNavItemIndex] ?? null
        nextPage = pageNavItems[pageNavItemIndex + 1] ?? null
      }
      pageNavItemIndex++
    }
    return { previousPage, currentPage, nextPage, currentGroup: currentGroup as NavItemGroup | null }
  }, [navItems, pathWithoutLocale])

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
    <NavContext.Provider value={{ pagePath, navItems, previousPage, currentPage, nextPage, currentGroup }}>
      <DocumentContext.Provider value={{ frontmatter, outline, markOutlineItem, highlightedOutlineItemId }}>
        <NextSeo title={`${frontmatter?.title ? `${frontmatter.title} - ` : ''} The Graph Docs`} />

        <div
          sx={{
            display: ['flex', null, null, 'grid'],
            gridTemplateColumns: '244px auto 216px',
            flexDirection: 'column',
          }}
        >
          <div
            sx={{
              display: ['none', null, null, 'block'],
              mt: 'calc(-1 * var(--gds-header-height) * var(--gds-header-fixed))',
              ml: '-8px',
              mr: '24px',
            }}
          >
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

            <article className="graph-docs-content" sx={mdxStyles}>
              {currentGroup ? (
                <div className="graph-docs-current-group" sx={{ display: 'none' }}>
                  {currentGroup.title}
                </div>
              ) : null}
              {frontmatter?.title ? <Heading.H1>{frontmatter.title}</Heading.H1> : null}
              <MDXProvider components={mdxComponents}>{children}</MDXProvider>
            </article>

            <Flex.Row sx={{ display: [null, null, null, 'none'], mt: Spacing.XL_XXL }}>
              <EditPageLink mobile />
            </Flex.Row>

            <div sx={{ mt: Spacing.XXL }}>
              <MDXLayoutPagination />
            </div>
          </div>

          <div
            sx={{
              display: ['none', null, null, 'block'],
              mt: 'calc(-1 * var(--gds-header-height) * var(--gds-header-fixed))',
              ml: '40px',
              mr: '-8px',
            }}
          >
            <MDXLayoutOutline />
          </div>
        </div>
      </DocumentContext.Provider>
    </NavContext.Provider>
  )
}
