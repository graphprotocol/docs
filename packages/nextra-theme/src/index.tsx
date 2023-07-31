import merge from 'lodash/merge'
import { NextSeo, NextSeoProps } from 'next-seo'
import { NextraThemeLayoutProps } from 'nextra'
import { useFSRoute } from 'nextra/hooks'
import { MDXProvider } from 'nextra/mdx'
import { Item, normalizePages } from 'nextra/normalize-pages'
import { ReactElement, useCallback, useMemo } from 'react'
import { useSet } from 'react-use'
import { ThemeUIStyleObject } from 'theme-ui'

import { Divider, DividerProps, Flex, Icon, Spacing, useI18n } from '@edgeandnode/gds'
import { NPSForm } from '@edgeandnode/organisms'

import {
  Blockquote,
  CodeBlock,
  CodeInline,
  Difficulty,
  EditPageLink,
  Heading,
  Image,
  LinkInline,
  ListItem,
  ListOrdered,
  ListUnordered,
  Paragraph,
  Table,
  VideoEmbed,
} from '@/components'
import { DocumentContext, MDXLayoutNav, MDXLayoutOutline, MDXLayoutPagination, NavContext } from '@/layout'

const mdxComponents = {
  blockquote: Blockquote,
  pre: CodeBlock,
  code: CodeInline,
  hr: (props: DividerProps) => <Divider sx={{ my: Spacing['32px'] }} {...props} />,
  h1: Heading.H1,
  h2: Heading.H2,
  h3: Heading.H3,
  h4: Heading.H4,
  h5: Heading.H5,
  h6: Heading.H6,
  img: Image,
  a: LinkInline,
  li: ListItem,
  ol: ListOrdered,
  ul: ListUnordered,
  p: Paragraph,
  table: Table,
  CodeInline,
  Difficulty,
  ListUnordered,
  Table,
  VideoEmbed,
}

const mdxStyles: ThemeUIStyleObject = {
  overflowWrap: 'break-word',
  'img + em': {
    mt: Spacing['16px'],
    display: 'block',
    textAlign: 'center',
  },
}

export { Heading, Image, LinkInline, Paragraph }

export default function NextraLayout({ children, pageOpts, pageProps }: NextraThemeLayoutProps): ReactElement {
  const { frontMatter, filePath, pageMap, headings, title } = pageOpts
  const { locale, defaultLocale } = useI18n<any>()
  const fsPath = useFSRoute()

  const args = useMemo(() => {
    const result = normalizePages({
      list: pageMap,
      locale,
      defaultLocale: defaultLocale,
      route: fsPath,
    })

    function removeNonExistedRoutes(items: Item[]): Item[] {
      return items.reduce<Item[]>((acc, curr) => {
        if (curr.route || curr.type === 'heading' || curr.type === 'separator') {
          if (curr.children) {
            curr.children = removeNonExistedRoutes(curr.children)
          }
          acc.push(curr)
        }
        return acc
      }, [])
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- i don't know why it's complain
    return {
      ...result,
      directories: removeNonExistedRoutes(result.directories),
      flatDirectories: result.flatDirectories.filter(
        (item) => item.type !== 'separator' && item.type !== 'heading' && item.route !== '',
      ),
    }
  }, [defaultLocale, fsPath, locale, pageMap])

  // Provide `markOutlineItem` to the `DocumentContext` so child `Heading` components can mark outline items as "in or above view" or not
  const [
    ,
    { add: markOutlineItemAsInOrAboveView, remove: markOutlineItemAsNotInOrAboveView, has: outlineItemIsInOrAboveView },
  ] = useSet(new Set<string>([]))

  const markOutlineItem = useCallback(
    (id: string, inOrAboveView: boolean) => {
      if (inOrAboveView) {
        markOutlineItemAsInOrAboveView(id)
      } else {
        markOutlineItemAsNotInOrAboveView(id)
      }
    },
    [markOutlineItemAsInOrAboveView, markOutlineItemAsNotInOrAboveView],
  )
  // Compute `highlightedOutlineItemId` for the `DocumentContext` based on outline items that have been marked as "in or above view"
  const highlightedOutlineItemId = useMemo(() => {
    let _highlightedOutlineItemId = null
    for (const heading of headings) {
      if (heading.depth <= 3 && outlineItemIsInOrAboveView(heading.id)) {
        _highlightedOutlineItemId = heading.id
      }
    }
    return _highlightedOutlineItemId
  }, [headings, outlineItemIsInOrAboveView])

  let seo: NextSeoProps = {
    title: `${title ? `${title} - ` : ''}The Graph Docs`,
  }
  if (frontMatter.description) {
    seo.description = frontMatter.description
  }
  if (frontMatter.socialImage) {
    seo.openGraph = {
      images: [{ url: frontMatter.socialImage }],
    }
  }
  if (frontMatter.seo) {
    seo = merge(seo, frontMatter.seo)
  }

  return (
    <NavContext.Provider value={{ filePath: pageProps.remoteFilePath || filePath, ...args }}>
      <DocumentContext.Provider value={{ frontMatter, headings, markOutlineItem, highlightedOutlineItemId }}>
        <NextSeo {...seo} />

        <div
          sx={{
            display: ['flex', null, null, 'grid'],
            flexDirection: 'column',
            gridTemplateColumns: '224px auto 224px',
          }}
        >
          <div
            sx={{
              display: ['none', null, null, 'block'],
              mt: 'calc(-1 * var(--gds-header-height) * var(--gds-header-fixed))',
              marginInlineStart: '-8px',
              marginInlineEnd: '16px',
            }}
          >
            <MDXLayoutNav />
          </div>

          <div sx={{ pt: [null, null, null, Spacing['32px']] }}>
            <div sx={{ display: [null, null, null, 'none'], mb: Spacing['32px'] }}>
              <MDXLayoutNav mobile />
            </div>

            <article className="graph-docs-content" sx={mdxStyles}>
              {args.activePath.length > 1 ? (
                <div className="graph-docs-current-group" sx={{ display: 'none' }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-return -- i don't know why it's complain */}
                  {args.activePath.map((item) => item.title).join(' > ')}
                </div>
              ) : null}
              {frontMatter.title ? <Heading.H1>{frontMatter.title}</Heading.H1> : null}
              <MDXProvider components={mdxComponents}>{children}</MDXProvider>
            </article>

            <Flex.Row sx={{ display: [null, null, null, 'none'], mt: Spacing['48px'] }}>
              <EditPageLink mobile />
            </Flex.Row>

            <div sx={{ mt: Spacing['64px'] }}>
              <MDXLayoutPagination />
              <NPSForm
                key={fsPath}
                question="Was this page helpful?"
                choices={[
                  {
                    label: 'No',
                    commentsLabel: 'How can we improve this page?',
                    icon: <Icon.ThumbsDown title="No" size="24px" />,
                    hideLabel: true,
                    score: -1,
                  },
                  {
                    label: 'Yes',
                    commentsLabel: 'In what way did this page help you?',
                    icon: <Icon.ThumbsUp title="Yes" size="24px" />,
                    hideLabel: true,
                    score: 1,
                  },
                ]}
                chipSize="xlarge"
                sx={{ mb: Spacing['32px'] }}
              />
            </div>
          </div>

          <div
            sx={{
              display: ['none', null, null, 'block'],
              mt: 'calc(-1 * var(--gds-header-height) * var(--gds-header-fixed))',
              marginInlineStart: '32px',
              marginInlineEnd: '-8px',
            }}
          >
            <MDXLayoutOutline />
          </div>
        </div>
      </DocumentContext.Provider>
    </NavContext.Provider>
  )
}
