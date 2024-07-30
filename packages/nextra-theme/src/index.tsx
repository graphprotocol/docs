import merge from 'lodash/merge'
import { NextSeo, type NextSeoProps } from 'next-seo'
import type { NextraMDXContent, NextraThemeLayoutProps } from 'nextra'
import { useFSRoute, useRouter } from 'nextra/hooks'
import { MDXProvider } from 'nextra/mdx'
import { normalizePages } from 'nextra/normalize-pages'
import { type ReactElement, useCallback, useContext, useMemo } from 'react'
import { useSet } from 'react-use'
import type { ThemeUICSSObject } from 'theme-ui'

import { Code, Divider, type DividerProps, Flex, Spacing } from '@edgeandnode/gds'

import {
  Callout,
  CodeBlock,
  Difficulty,
  DocSearch,
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

const MDXWrapper: NextraMDXContent = ({ children, toc }) => {
  const { activePath } = useContext(NavContext)!
  const { frontMatter, timestamp, readingTime } = useContext(DocumentContext)!
  const { locale } = useRouter()
  const lastUpdated = timestamp ? new Date(timestamp) : null

  return (
    <>
      <div sx={{ pt: [null, null, null, Spacing['24px']] }}>
        <div sx={{ display: [null, null, null, 'none'], mb: Spacing['32px'] }}>
          <MDXLayoutNav mobile />
        </div>

        <article className="graph-docs-content" sx={mdxStyles}>
          {activePath.length > 1 && (
            <div className="graph-docs-current-group" sx={{ display: 'none' }}>
              {activePath.map((item) => item.title).join(' > ')}
            </div>
          )}
          {frontMatter.title ? <Heading.H1>{frontMatter.title}</Heading.H1> : null}
          {(lastUpdated || readingTime) && (
            <Paragraph size="14px">
              {lastUpdated && (
                <span>
                  <span sx={{ color: 'White64' }}>Last updated:</span>{' '}
                  <time
                    dateTime={lastUpdated.toISOString()}
                    // Removes hydration errors because `toLocaleDateString` show different results
                    // in Node.js and in browser for some languages like `ar`
                    suppressHydrationWarning
                  >
                    {lastUpdated.toLocaleDateString(locale, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </span>
              )}
              <span
                sx={{
                  mx: Spacing['16px'],
                  display: 'inline-block',
                  verticalAlign: 'top',
                  width: '1px',
                  height: '20px',
                  bg: 'White16',
                  '&:not(span + span), &:not(:has(+ span))': {
                    display: 'none',
                  },
                }}
              />
              {!!readingTime?.minutes && (
                <span>
                  <span sx={{ color: 'White64' }}>Reading time:</span> {Math.ceil(readingTime.minutes)} min
                </span>
              )}
            </Paragraph>
          )}
          {children}
        </article>

        <Flex.Row sx={{ display: [null, null, null, 'none'], mt: Spacing['48px'] }}>
          <EditPageLink mobile />
        </Flex.Row>

        <div sx={{ mt: Spacing['64px'] }}>
          <MDXLayoutPagination />
          {/* TODO: Uncomment when we're ready to add the NPS form to the docs
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
            */}
        </div>
      </div>

      <div
        sx={{
          display: ['none', null, null, 'block'],
          marginInlineStart: '32px',
          marginInlineEnd: '-8px',
        }}
      >
        <MDXLayoutOutline toc={toc} />
      </div>
    </>
  )
}

const mdxComponents = {
  blockquote: Callout,
  pre: CodeBlock,
  code: Code.Inline as any,
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
  Callout,
  CodeBlock,
  Difficulty,
  Heading,
  Image,
  LinkInline,
  ListItem,
  ListOrdered,
  ListUnordered,
  Paragraph,
  Table,
  VideoEmbed,
  wrapper: MDXWrapper as any,
}

const mdxStyles: ThemeUICSSObject = {
  overflowWrap: 'break-word',
  'img + em': {
    mt: Spacing['16px'],
    display: 'block',
    textAlign: 'center',
  },
}

export const CodeInline = Code.Inline

export {
  Callout,
  CodeBlock,
  Difficulty,
  DocSearch,
  Heading,
  Image,
  LinkInline,
  ListItem,
  ListOrdered,
  ListUnordered,
  Paragraph,
  Table,
  VideoEmbed,
}

export default function NextraLayout({ children, pageOpts, pageProps }: NextraThemeLayoutProps): ReactElement {
  const { frontMatter, filePath, pageMap, title, timestamp, readingTime } = pageOpts
  const fsPath = useFSRoute()
  const { locale } = useRouter()
  const args = useMemo(() => {
    const result = normalizePages({
      list: pageMap,
      route: fsPath,
    })
    if (typeof window === 'undefined' && locale === 'en') {
      // Execute this check for sidebar links only on server, will be stripped from client build
      for (const item of result.flatDocsDirectories) {
        if (!item.route) {
          throw new Error(`Route "${item.name}" does not exist. Remove this field from _meta.js file`)
        }
      }
    }
    return result
  }, [fsPath, pageMap, locale])

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

  let seo: NextSeoProps = {
    title: `${title ? `${title} | ` : ''}Docs | The Graph`,
    description: frontMatter.description,
    openGraph: {
      title,
      images: [
        {
          url:
            frontMatter.socialImage || `https://thegraph-docs-opengraph-image.the-guild.dev?title=${encodeURI(title)}`,
        },
      ],
    },
  }
  if (frontMatter.seo) {
    seo = merge(seo, frontMatter.seo)
  }

  return (
    <NavContext.Provider value={{ filePath: pageProps.remoteFilePath || filePath, ...args }}>
      <DocumentContext.Provider
        value={{
          frontMatter,
          markOutlineItem,
          outlineItemIsInOrAboveView,
          timestamp,
          readingTime,
        }}
      >
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
              marginInlineStart: '-8px',
              marginInlineEnd: '16px',
            }}
          >
            <MDXLayoutNav />
          </div>

          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </div>
      </DocumentContext.Provider>
    </NavContext.Provider>
  )
}
