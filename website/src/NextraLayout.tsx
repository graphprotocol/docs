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
import {
  BookOpenText,
  Files,
  House,
  RoleIndexer,
  Stack,
  Subgraph,
  Substreams,
  SubstreamsPoweredSubgraph,
  TheGraph,
} from '@edgeandnode/gds/icons'

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

  const activeRoute = normalizePagesResult.activePath.at(-1)?.route ?? null

  type NavigationItem = WithOptional<(typeof normalizePagesResult.directories)[number], 'children'>
  type NavigationGroup = {
    title: string | undefined
    icon: ReactNode | undefined
    route: string | undefined
    items: NavigationItem[]
  }
  const getNavigationItemIcon = (item: NavigationItem) => {
    const routeWithoutLocale = item.route.slice(3) || '/'
    if (routeWithoutLocale === '/') {
      return <House variant="fill" alt="" />
    }
    if (routeWithoutLocale === '/about' || routeWithoutLocale.startsWith('/about/')) {
      return <TheGraph alt="" />
    }
    if (routeWithoutLocale === '/supported-networks' || routeWithoutLocale.startsWith('/supported-networks/')) {
      return <Stack alt="" />
    }
    if (routeWithoutLocale === '/contracts' || routeWithoutLocale.startsWith('/contracts/')) {
      return <Files alt="" />
    }
    if (routeWithoutLocale === '/subgraphs' || routeWithoutLocale.startsWith('/subgraphs/')) {
      return <Subgraph alt="" />
    }
    if (routeWithoutLocale === '/substreams' || routeWithoutLocale.startsWith('/substreams/')) {
      return <Substreams alt="" />
    }
    if (routeWithoutLocale === '/sps' || routeWithoutLocale.startsWith('/sps/')) {
      return <SubstreamsPoweredSubgraph alt="" />
    }
    if (routeWithoutLocale === '/indexing' || routeWithoutLocale.startsWith('/indexing/')) {
      return <RoleIndexer alt="" />
    }
    if (
      routeWithoutLocale === '/resources' ||
      routeWithoutLocale.startsWith('/resources/') ||
      routeWithoutLocale === '/archived' ||
      routeWithoutLocale.startsWith('/archived/')
    ) {
      return <BookOpenText alt="" />
    }
    return null
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
      const itemHasChildren = Boolean(item.children?.length)
      if (item.type === 'children' && !itemHasChildren) return groups
      /**
       * When an item of type `children` doesn't have a title set in the meta file, we want to render it without a `NavigationItem` wrapper.
       * Unfortunately, Nextra defaults `title` to `name`, so the way to check if it's empty is to check if it's equal to `name`, which should
       * never happen with an explicitly set `title` because it should be title case whereas `name` will always be lowercase.
       */
      const itemHasNoWrapper = item.type === 'children' && item.title === item.name
      let currentGroup = groups[groups.length - 1]
      /**
       * Create a new group if it's the first one, if the current item is a separator, or if the current group has some items but no title
       * (meaning its items are rendered at the top level instead of in an expandable panel) while the current item has children and a wrapper.
       */
      if (
        !currentGroup ||
        item.type === 'separator' ||
        (currentGroup.title === undefined && currentGroup.items.length > 0 && itemHasChildren && !itemHasNoWrapper)
      ) {
        groups.push({
          title: item.type === 'separator' ? item.title : undefined,
          icon: undefined,
          route: undefined,
          items: [],
        })
      }
      if (item.type === 'separator') return groups
      currentGroup = groups[groups.length - 1]!
      if (currentGroup.title === undefined && currentGroup.items.length === 0 && itemHasChildren && !itemHasNoWrapper) {
        /**
         * If the group has no title and the first item we want to add to it has children and a wrapper, give the item's title, icon, route
         * (if different from the first child's), and children to the group, instead of adding the item itself.
         */
        currentGroup.title = item.title
        currentGroup.icon = getNavigationItemIcon(item)
        const route = getNavigationItemRoute(item)
        const firstChildRoute = getNavigationItemRoute(item.children![0]!)
        currentGroup.route = route !== firstChildRoute ? route : undefined
        currentGroup.items.push(...item.children!)
      } else if (itemHasNoWrapper) {
        // Otherwise, if the first or next item to add to the group has no wrapper, just add its children to it
        currentGroup.items.push(...(item.children ?? []))
      } else {
        // Otherwise, add the item (which may or may not have children) to the group
        currentGroup.items.push(item)
      }
      return groups
    },
    [],
  )

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
                <TheGraph alt="" size={8} />
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
              {navigationGroups.map((group, groupIndex) => {
                if (group.items.length === 0) {
                  return null
                }
                const groupContent = group.items.map((groupItem) =>
                  (function renderItem(item: typeof groupItem) {
                    return (
                      <NavigationItem
                        key={item.name}
                        title={item.title}
                        icon={getNavigationItemIcon(item)}
                        href={getNavigationItemRoute(item)}
                        selected={item.route === activeRoute}
                        children={item.children?.length ? <>{item.children.map(renderItem)}</> : undefined}
                      />
                    )
                  })(groupItem),
                )
                return (
                  <NavigationGroup key={groupIndex}>
                    {group.title !== undefined ? (
                      <NavigationItem
                        title={group.title}
                        icon={group.icon ?? getNavigationItemIcon(group.items[0]!)}
                        href={group.route ?? getNavigationItemRoute(group.items[0]!)}
                        selected={group.route === activeRoute}
                      >
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
