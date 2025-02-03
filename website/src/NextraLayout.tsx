import merge from 'lodash/merge'
import { NextSeo, type NextSeoProps } from 'next-seo'
import type { NextraMDXContent, NextraThemeLayoutProps } from 'nextra'
import { useFSRoute, useRouter } from 'nextra/hooks'
import { MDXProvider } from 'nextra/mdx'
import { normalizePages } from 'nextra/normalize-pages'
import {
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useSet } from 'react-use'

import type { WithOptional } from '@edgeandnode/common'
import {
  ButtonOrLink,
  classNames,
  ExperimentalCodeBlock,
  type ExperimentalCodeBlockProps,
  ExperimentalDivider,
  ExperimentalLocaleSwitcher,
  ExperimentalSearch,
  Flex,
  Link,
  Locale,
  type NestedStrings,
} from '@edgeandnode/gds'

import { TheGraphLogo } from '@/assets/TheGraphLogo'
import {
  Difficulty,
  DocSearch,
  EditPageLink,
  Heading,
  NavigationGroup,
  NavigationItem,
  Paragraph,
  VideoEmbed,
} from '@/components'
import { useI18n } from '@/i18n'
import { DocumentContext, MDXLayoutNav, MDXLayoutOutline, MDXLayoutPagination, NavContext } from '@/layout'

const removeBasePathFromUrl = (url: string) => url.substring((process.env.BASE_PATH ?? '').length)

const DocSearchHit = ({ hit, children }: { hit: { url: string }; children?: ReactNode }) => (
  <Link.Unstyled href={removeBasePathFromUrl(hit.url)}>{children}</Link.Unstyled>
)

// TODO: Refactor / re-implement
const MDXWrapper: NextraMDXContent = ({ children, toc }) => {
  const { activePath } = useContext(NavContext)!
  const { frontMatter, timestamp, readingTime } = useContext(DocumentContext)!
  const { locale } = useRouter()
  const lastUpdated = timestamp ? new Date(timestamp) : null

  return (
    <>
      <div>
        <div sx={{ display: [null, null, null, 'none'] }}>
          <MDXLayoutNav mobile />
        </div>

        <article className="graph-docs-content">
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
                  {/* TODO: Translate */}
                  <span>Last updated:</span>{' '}
                  <time
                    dateTime={lastUpdated.toISOString()}
                    // Removes hydration errors because `toLocaleDateString` show different results in Node.js and in browser for some languages like `ar`
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
              {/* TODO: Translate */}
              {readingTime && readingTime.minutes > 0 ? (
                <span>Reading time: {Math.ceil(readingTime.minutes)} min</span>
              ) : null}
            </Paragraph>
          )}
          {children}
        </article>

        <Flex.Row sx={{ display: [null, null, null, 'none'] }}>
          <EditPageLink mobile />
        </Flex.Row>

        <MDXLayoutPagination />
      </div>

      <div sx={{ display: ['none', null, null, 'block'] }}>
        <MDXLayoutOutline toc={toc} />
      </div>
    </>
  )
}

interface CodeBlockProps extends Omit<ComponentPropsWithoutRef<'pre'>, 'children'> {
  children?:
    | ReactNode
    | {
        props: {
          children: string
          className?: string
        }
      }
}

// TODO: Add `graph-docs-not-markdown` class to all "custom" components
const mdxComponents = {
  /*
  blockquote: Callout,
  pre: CodeBlock,
  code: Code.Inline as any,
  hr: Divider,
  h1: Heading.H1,
  h2: Heading.H2,
  h3: Heading.H3,
  h4: Heading.H4,
  h5: Heading.H5,
  h6: Heading.H6,
  img: Image,
  li: List.Item,
  ol: ListOrdered,
  ul: ListUnordered,
  p: Paragraph,
  table: Table,
  */
  Difficulty,
  VideoEmbed,
  // wrapper: MDXWrapper,
  a: Link.Inline as any, // TODO: Fix `as any`
  pre: ({ className, children, ...props }: CodeBlockProps) => {
    const code = (
      children && typeof children === 'object' && 'props' in children
        ? String(children.props.children ?? '')
        : String(children ?? '')
    ).trim()
    const language =
      children && typeof children === 'object' && 'props' in children
        ? String(children.props.className ?? '').substring('language-'.length) || null
        : null
    const lineCount = code.split('\n').length
    return (
      <ExperimentalCodeBlock
        language={language as ExperimentalCodeBlockProps['language']}
        lineNumbers={lineCount > 1}
        className={classNames(['graph-docs-not-markdown not-last:mb-6', className])}
        {...(props as ComponentPropsWithoutRef<'div'>)}
      >
        {code}
      </ExperimentalCodeBlock>
    )
  },
  hr: ExperimentalDivider,
}

export default function NextraLayout({ children, pageOpts, pageProps }: NextraThemeLayoutProps): ReactElement {
  // TODO: Why is `timestamp` undefined on static builds?
  const { frontMatter, filePath, pageMap, title, timestamp, readingTime } = pageOpts
  const fsPath = useFSRoute()
  const router = useRouter()
  const { t, translations, locale } = useI18n()
  // TODO: Is this ever different than `useI18n`'s `locale`?
  // const locale = router.locale

  const normalizePagesResult = useMemo(() => {
    const result = normalizePages({
      list: pageMap,
      route: fsPath,
    })
    // TODO: Check for missing pages in other languages too
    if (typeof window === 'undefined' && locale === Locale.ENGLISH) {
      const checkIfRouteExists = (item: NavigationItem, baseRoute = '') => {
        const expectedRoute = `${baseRoute}/${item.name}`
        if (item.type === 'doc' && !item.route) {
          throw new Error(`Route "${expectedRoute}" does not exist. Remove this field from _meta.js file`)
        }
        for (const child of item.children ?? []) {
          checkIfRouteExists(child, item.route)
        }
      }
      result.docsDirectories.forEach((item) => checkIfRouteExists(item))
    }
    return result
  }, [fsPath, pageMap, locale])

  type NavigationItem = WithOptional<(typeof normalizePagesResult.directories)[number], 'children'>
  type NavigationGroup = {
    title: string | undefined
    route: string | undefined
    items: NavigationItem[]
  }
  const navigationItemIsExpandable = (item: NavigationItem) => {
    if (!item.children?.length) return false
    switch (item.type) {
      case 'children':
        /**
         * This is hacky: we want to render an item of type `children` without a `NavigationItem` wrapper only when
         * it doesn't have a title, but Nextra defaults `title` to `name` so it's never actually empty.
         */
        return item.title !== item.name
      default:
        return true
    }
  }
  const getNavigationItemRoute = (item: NavigationItem) => {
    let currentItem = item
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      if (!('children' in currentItem) || currentItem.withIndexPage) {
        return currentItem.route
      }
      if (!currentItem.children?.length) {
        return undefined
      }
      currentItem = currentItem.children[0]!
    }
  }
  const navigationGroups = normalizePagesResult.directories.reduce<NavigationGroup[]>(
    (groups, item: NavigationItem) => {
      if (item.type === 'separator') {
        groups.push({ title: item.title, route: undefined, items: [] })
      } else {
        const route = getNavigationItemRoute(item)
        let currentGroup = groups[groups.length - 1]
        if (
          !currentGroup ||
          currentGroup.items.some(navigationItemIsExpandable) ||
          (currentGroup.title === undefined && navigationItemIsExpandable(item))
        ) {
          groups.push({
            title: undefined,
            route,
            items: [],
          })
        }
        currentGroup = groups[groups.length - 1]!
        currentGroup.items.push(item)
        if (currentGroup.route === undefined && route !== undefined) {
          currentGroup.route = route
        }
      }
      return groups
    },
    [],
  )
  const activeRoute = normalizePagesResult.activePath.at(-1)?.route ?? null

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
    <NavContext.Provider
      value={{
        filePath: pageProps.remoteFilePath || frontMatter.remoteFilePath || filePath,
        ...normalizePagesResult,
      }}
    >
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

        <div className="grid grid-cols-[theme(spacing.64)_auto]">
          <nav
            aria-label="Main navigation" // TODO: Translate
            className="sticky top-0 h-screen overflow-y-auto overflow-x-clip border-e border-white/8 scrollbar-thin"
          >
            <header className="flex h-16 items-center border-b border-white/8 pe-4 ps-6">
              <div>
                <TheGraphLogo alt="" size={8} />
                <ButtonOrLink href="https://thegraph.com" className="absolute -inset-2">
                  <span className="sr-only">The Graph</span>
                </ButtonOrLink>
              </div>
              <div className="mx-3 h-7 w-px bg-white/8" />
              <div className="text-16 text-white/48">Docs</div>
            </header>
            <div className="p-4">
              <DocSearch
                apiKey={process.env.ALGOLIA_API_KEY ?? ''}
                appId={process.env.ALGOLIA_APP_ID ?? ''}
                indexName="thegraph-docs"
                searchParameters={{
                  facetFilters: [`language:${locale}`],
                }}
                disableUserPersonalization={true}
                transformItems={(items: any) =>
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                  items.map((item: any) => ({
                    ...item,
                    url: item.url.replace('https://thegraph.com/docs', process.env.BASE_PATH ?? ''),
                  }))
                }
                hitComponent={DocSearchHit}
                navigator={{
                  navigate({ itemUrl }: { itemUrl: string }) {
                    void router.push(removeBasePathFromUrl(itemUrl))
                  },
                  navigateNewTab({ itemUrl }: { itemUrl: string }) {
                    const windowReference = window.open(itemUrl, '_blank', 'noopener')
                    windowReference?.focus()
                  },
                  navigateNewWindow({ itemUrl }: { itemUrl: string }) {
                    window.open(itemUrl, '_blank', 'noopener')
                  },
                }}
                translations={translations.docsearch as NestedStrings}
                placeholder={t('docsearch.button.buttonText')}
              >
                {({ buttonRef, openModal }) => (
                  <div>
                    <button
                      ref={buttonRef}
                      onClick={openModal}
                      className="absolute left-0 top-0 h-full w-full rounded-full"
                    >
                      <span className="sr-only">Search</span>
                    </button>
                    <ExperimentalSearch size="small" tabIndex={-1} onFocus={openModal} />
                    <span className="text-p12 pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/48">
                      <span>
                        <kbd>⌘</kbd> <kbd>K</kbd>
                      </span>
                    </span>
                  </div>
                )}
              </DocSearch>
              {/* TODO: Add icons to some navigation items */}
              {navigationGroups.map((group, groupIndex) => {
                if (group.items.length === 0) {
                  return null
                }
                const groupContent = group.items.map((groupItem) =>
                  (function renderItem(item: typeof groupItem): ReactNode {
                    const childrenContent = item.children?.length ? item.children.map(renderItem) : null
                    if (childrenContent && !navigationItemIsExpandable(item)) {
                      return childrenContent
                    } else {
                      return (
                        <NavigationItem
                          key={item.name}
                          title={item.title}
                          href={getNavigationItemRoute(item)}
                          selected={item.route === activeRoute}
                          children={childrenContent}
                        />
                      )
                    }
                  })(groupItem),
                )
                return (
                  <NavigationGroup key={groupIndex}>
                    {group.title !== undefined ? (
                      <NavigationItem title={group.title} href={group.route}>
                        {groupContent}
                      </NavigationItem>
                    ) : (
                      groupContent
                    )}
                  </NavigationGroup>
                )
              })}
            </div>
          </nav>

          <main>
            <header className="flex h-16 items-center border-b border-white/8 px-6">
              <ExperimentalLocaleSwitcher className="ms-auto" />
            </header>
            <div className="p-12">
              <article
                className={`
                  text-p18 mx-auto w-[50vw] max-w-[80ch] leading-9 text-text
                  mdx-[h1]:text-h40
                  mdx-[h2]:text-h32
                  mdx-[h3]:text-h24
                  mdx-[h4]:text-h20
                  mdx-[h5,h6]:text-h18
                  mdx-[:is(ul,ol)_:is(ul,ol)]:mt-2
                  mdx-[ul,ol]:flex
                  mdx-[ol]:list-decimal
                  mdx-[ul]:list-disc
                  mdx-[ul,ol]:flex-col
                  mdx-[ul,ol]:gap-2
                  mdx-[li]:pl-2
                  mdx-[ul,ol]:pl-6
                  mdx-[b,strong]:text-white
                  mdx-[h1,h2,h3,h4,h5,h6]:text-white
                  not-first:mdx-[h1,h2,h3,h4,h5,h6]:mt-12
                  not-last:mdx-[h1,h2,h3,h4,h5,h6]:mb-3
                  not-last:mdx-[p,ul,ol]:mb-6
                `}
              >
                <h1>{frontMatter.title}</h1>
                <MDXProvider components={mdxComponents}>{children}</MDXProvider>
              </article>
            </div>
          </main>
        </div>
      </DocumentContext.Provider>
    </NavContext.Provider>
  )
}
