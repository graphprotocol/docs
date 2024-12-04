import merge from 'lodash/merge'
import { NextSeo, type NextSeoProps } from 'next-seo'
import type { NextraMDXContent, NextraThemeLayoutProps } from 'nextra'
import { useFSRoute, useRouter } from 'nextra/hooks'
import { MDXProvider } from 'nextra/mdx'
import { normalizePages } from 'nextra/normalize-pages'
import {
  type ComponentProps,
  createContext,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useSet } from 'react-use'

import {
  ButtonOrLink,
  type ButtonOrLinkProps,
  classNames,
  Code,
  Divider,
  ExperimentalButton,
  ExperimentalSearch,
  ExperimentalSelectChip,
  ExperimentalTransition,
  Flex,
  Link,
  List,
} from '@edgeandnode/gds'
import {
  CaretDown,
  CirclesFour,
  House,
  MagicWand,
  Subgraph,
  Substreams,
  SubstreamsPoweredSubgraph,
} from '@edgeandnode/gds/icons'

import { TheGraphLogo } from '@/assets/TheGraphLogo'

import {
  Callout,
  CodeBlock,
  Difficulty,
  EditPageLink,
  Heading,
  Image,
  ListOrdered,
  ListUnordered,
  Paragraph,
  Table,
  VideoEmbed,
} from './components'
import { DocumentContext, MDXLayoutNav, MDXLayoutOutline, MDXLayoutPagination, NavContext } from './layout'

const MDXWrapper: NextraMDXContent = ({ children, toc }) => {
  const { activePath } = useContext(NavContext)!
  const { frontMatter, timestamp, readingTime } = useContext(DocumentContext)!
  const { locale } = useRouter()
  const lastUpdated = timestamp ? new Date(timestamp) : null

  return (
    <>
      <div className="p-26">
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
                  <span>Last updated:</span>{' '}
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
              {!!readingTime?.minutes && <span>Reading time: {Math.ceil(readingTime.minutes)} min</span>}
            </Paragraph>
          )}
          {children}
        </article>

        <Flex.Row sx={{ display: [null, null, null, 'none'] }}>
          <EditPageLink mobile />
        </Flex.Row>

        <MDXLayoutPagination />
      </div>

      {/* TODO: Re-implement
        <div sx={{ display: ['none', null, null, 'block'] }}>
          <MDXLayoutOutline toc={toc} />
        </div>
      */}
    </>
  )
}

const mdxComponents = {
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
  a: Link.Inline as any,
  li: List.Item,
  ol: ListOrdered,
  ul: ListUnordered,
  p: Paragraph,
  table: Table,
  Difficulty,
  VideoEmbed,
  wrapper: MDXWrapper,
}

const NavigationGroup = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={classNames(['-mx-2 overflow-clip border-b border-white/8 p-2', className])} {...props}>
      <NavigationList>{children}</NavigationList>
    </div>
  )
}

const NavigationListContext = createContext<{
  depth: number
} | null>(null)

const NavigationList = ({ className, children, ...props }: ComponentProps<'ul'>) => {
  const ancestorNavigationListContext = useContext(NavigationListContext)
  const depth = ancestorNavigationListContext ? ancestorNavigationListContext.depth + 1 : 0

  return (
    <NavigationListContext.Provider value={{ depth }}>
      <ul data-depth={depth} className={classNames(['group/navigation-list', className])} {...props}>
        {children}
      </ul>
    </NavigationListContext.Provider>
  )
}

declare namespace NavigationItemProps {
  interface BaseProps {
    title: string
    icon?: ReactNode
  }
  interface ButtonProps extends BaseProps, Omit<ButtonOrLinkProps.ButtonProps, 'title'> {}
  interface ExternalLinkProps extends BaseProps, Omit<ButtonOrLinkProps.ExternalLinkProps, 'title'> {}
  interface ClientLinkProps extends BaseProps, Omit<ButtonOrLinkProps.ClientLinkProps, 'title'> {}
}

type NavigationItemProps =
  | NavigationItemProps.ButtonProps
  | NavigationItemProps.ExternalLinkProps
  | NavigationItemProps.ClientLinkProps

const NavigationItem = ({ title, icon, onClick, className, children, ...props }: NavigationItemProps) => {
  const navigationListContext = useContext(NavigationListContext)
  const depth = navigationListContext?.depth ?? 0
  const [expanded, setExpanded] = useState(false)

  return (
    <li data-expanded={expanded || undefined} className={classNames(['group/navigation-item', className])}>
      <div className="flex items-center">
        {/* TODO: Focus ring? */}
        <ButtonOrLink
          onClick={(event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
            setExpanded(true)
            onClick?.(event)
          }}
          className={`
            flex flex-1 gap-1 p-2 text-white/64 transition
            hocus-visible:text-white
            aria-[current=true]:text-white
            nested-icon:size-3.5
            nested-icon:aria-[current=true]:prop-color-purple
          `}
          {...props}
        >
          <span className="flex h-5 w-4 shrink-0 items-center justify-center">{icon}</span>
          <span className="text-p14">{title}</span>
          {depth > 0 ? (
            <span className="absolute inset-y-0 left-2 flex w-1.5 flex-col items-center gap-1">
              <span
                className={`
                  w-px flex-1 bg-white/8
                  not-in-group-data-[depth=2]/navigation-list:nearest-group-first/navigation-item:opacity-0
                `}
              />
              <span
                className={`
                  size-1.5 rounded-full bg-white/8 transition
                  in-clickable-hocus-visible:bg-white/16
                  in-clickable-[[aria-current=true]]:bg-purple
                  in-clickable-[[aria-current=true]]:transition-none
                `}
              />
              <span
                className={`
                  w-px flex-1 bg-white/8 transition duration-0 ease-[step-end]
                  not-in-group-[:not(:last-child)]/navigation-item:nearest-group-[:not([data-expanded])]/navigation-item:opacity-0
                  not-in-group-[:not(:last-child)]/navigation-item:nearest-group-[:not([data-expanded])]/navigation-item:duration-300
                `}
              />
            </span>
          ) : null}
        </ButtonOrLink>
        {children ? (
          <ExperimentalButton
            variant="tertiary"
            size="xsmall"
            aria-expanded={expanded}
            onClick={() => setExpanded((expanded) => !expanded)}
          >
            <CaretDown
              alt={expanded ? 'Collapse' : 'Expand'}
              size={3.5}
              className="transition duration-300 in-clickable-[[aria-expanded=true]]:-rotate-180"
            />
          </ExperimentalButton>
        ) : null}
      </div>
      {children ? (
        <div>
          <ExperimentalTransition
            duration={300}
            mode="exit-enter"
            className={`
              not-safari:group-data-[depth=1]/navigation-list:[--gds-transition-enter-translate-x:-16px]
              not-safari:group-data-[depth=1]/navigation-list:[--gds-transition-exit-translate-x:-16px]
              not-in-group-data-[depth=1]/navigation-list:[--gds-transition-enter-opacity:1]
              not-in-group-data-[depth=1]/navigation-list:[--gds-transition-exit-opacity:1]
            `}
          >
            <NavigationList
              key={expanded ? 'expanded' : 'collapsed'}
              className="group-data-[depth=1]/navigation-list:pl-4"
            >
              {expanded ? children : null}
            </NavigationList>
          </ExperimentalTransition>
          {depth > 0 ? (
            <span
              data-expanded={expanded || undefined}
              className="group/navigation-item-children-line absolute inset-y-0 left-2.5 z-10 w-[17px] translate-x-[0.5px]"
            >
              <svg
                viewBox="0 0 17 17"
                className={`
                  absolute -top-2 left-0 z-10 aspect-square w-full origin-left bg-background fill-none stroke-white/8 transition duration-150
                  group-data-[expanded]/navigation-item-children-line:delay-150
                  group-not-data-[expanded]/navigation-item-children-line:opacity-0
                `}
              >
                <path
                  d="M 0.5 0 C 0.5 13, 16.5 4, 16.5 17"
                  className={`
                    transition-all duration-150
                    [d:path('M_0.5_0_C_0.5_13,_0.5_4,_0.5_17')]
                    group-data-[expanded]/navigation-item-children-line:delay-150
                    group-data-[expanded]/navigation-item-children-line:[d:path('M_0.5_0_C_0.5_13,_16.5_4,_16.5_17')]
                  `}
                />
              </svg>
              <span
                data-expanded={expanded || undefined}
                className={`
                  absolute inset-y-0 left-0 w-px bg-white/8 transition delay-75 duration-75
                  group-data-[expanded]/navigation-item-children-line:opacity-0
                  group-data-[expanded]/navigation-item-children-line:delay-150
                `}
              />
              <svg
                viewBox="0 0 17 17"
                data-expanded={expanded || undefined}
                className={`
                  absolute -bottom-2 left-0 aspect-square w-full origin-left bg-background fill-none stroke-white/8 transition duration-150
                  group-data-[expanded]/navigation-item-children-line:delay-150
                  group-not-data-[expanded]/navigation-item-children-line:opacity-0
                  nearest-group-last/navigation-item:opacity-0
                `}
              >
                <path
                  d="M 16.5 0 C 16.5 13, 0.5 4, 0.5 17"
                  className={`
                    transition-all duration-150
                    [d:path('M_0.5_0_C_0.5_13,_0.5_4,_0.5_17')]
                    group-data-[expanded]/navigation-item-children-line:delay-150
                    group-data-[expanded]/navigation-item-children-line:[d:path('M_16.5_0_C_16.5_13,_0.5_4,_0.5_17')]
                  `}
                />
              </svg>
            </span>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}

export default function NextraLayout({ children, pageOpts, pageProps }: NextraThemeLayoutProps): ReactElement {
  // TODO: Why is `timestamp` undefined on static builds?
  const { frontMatter, filePath, pageMap, title, timestamp, readingTime } = pageOpts

  const fsPath = useFSRoute()
  const { locale } = useRouter()
  const normalizePagesResult = useMemo(() => {
    const result = normalizePages({
      list: pageMap,
      route: fsPath,
    })
    // TODO: Check for missing pages in other languages too
    if (typeof window === 'undefined' && locale === 'en') {
      const checkIfRouteExists = (item: (typeof result.docsDirectories)[number], baseRoute = '') => {
        const expectedRoute = `${baseRoute}/${item.name}`
        if (item.type === 'doc' && !item.route) {
          throw new Error(`Route "${expectedRoute}" does not exist. Remove this field from _meta.js file`)
        }
        for (const child of (item.children as typeof item.children | undefined) ?? []) {
          checkIfRouteExists(child, item.route)
        }
      }
      result.docsDirectories.forEach((item) => checkIfRouteExists(item))
    }
    return result
  }, [fsPath, pageMap, locale])

  type NavigationGroup = {
    title: string
    route: string | null
    items: typeof normalizePagesResult.directories
  }
  const navigationGroups = normalizePagesResult.directories.reduce<NavigationGroup[]>((groups, item) => {
    if (groups.length === 0 || item.type === 'separator') {
      groups.push({ title: item.title, route: item.route, items: [] })
    }
    if (item.type !== 'separator') {
      groups[groups.length - 1]!.items.push(item)
    }
    return groups
  }, [])
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

        <div
          sx={{
            display: ['block', null, null, 'grid'],
            gridTemplateColumns: '240px auto 240px',
          }}
        >
          <div sx={{ display: ['none', null, null, 'block'] }}>
            {/* TODO: Integrate in MDXLayoutNav */}
            <nav
              aria-label="Main navigation" // TODO: Translate
              className="sticky top-0 h-screen overflow-y-auto overflow-x-clip border-e border-white/8 p-2"
            >
              <header className="flex items-center py-4 ps-2">
                <div>
                  <TheGraphLogo alt="" size={8} />
                  <ButtonOrLink href="https://thegraph.com" className="absolute -inset-2">
                    <span className="sr-only">The Graph</span>
                  </ButtonOrLink>
                </div>
                <div className="mx-3 h-7 w-px bg-white/8" />
                <div className="text-16 text-white/88">Docs</div>
                {/* TODO: Make language switcher functional */}
                {/* TODO GDS: Allow changing padding of `ExperimentalChip`? */}
                <ExperimentalSelectChip size="small" valueLabel="EN" className="ms-auto">
                  <ExperimentalSelectChip.Option>English</ExperimentalSelectChip.Option>
                  <ExperimentalSelectChip.Option>Spanish</ExperimentalSelectChip.Option>
                  <ExperimentalSelectChip.Option>French</ExperimentalSelectChip.Option>
                </ExperimentalSelectChip>
              </header>
              {/* TODO: Make search functional */}
              {/* TODO GDS: Allow changing background color, border color, and border radius of `ExperimentalSearch`? */}
              <div className="my-2">
                <ExperimentalSearch size="small" />
                <span className="text-p12 pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/88">
                  <span>
                    <kbd>⌘</kbd> <kbd>K</kbd>
                  </span>
                </span>
              </div>
              {/* TODO: Use real navigation items */}
              <NavigationGroup>
                <NavigationItem
                  title="Home"
                  icon={<House variant="fill" alt="" />}
                  href="/"
                  selected={activeRoute === '/en'}
                />
                <NavigationItem
                  title="Supported Networks"
                  icon={<CirclesFour variant="fill" alt="" />}
                  href="/developing/supported-networks"
                  selected={activeRoute === '/en/developing/supported-networks'}
                />
                <NavigationItem title="Concepts" icon={<MagicWand alt="" />} />
              </NavigationGroup>
              <NavigationGroup>
                <NavigationItem title="Subgraphs" icon={<Subgraph alt="" />}>
                  <NavigationItem title="Quick Start" />
                  <NavigationItem title="Querying Subgraphs" />
                  <NavigationItem title="Developing a Subgraph" />
                  <NavigationItem title="Graph Client">
                    <NavigationItem title="Architecture">
                      <NavigationItem title="Quick Start With Long Title To Show How It Wraps" />
                      <NavigationItem title="Querying Subgraphs" />
                      <NavigationItem title="Developing a Subgraph Also With A Long Title" />
                    </NavigationItem>
                    <NavigationItem title="Live" />
                  </NavigationItem>
                  <NavigationItem title="Cookbooks" />
                </NavigationItem>
              </NavigationGroup>
              <NavigationGroup>
                <NavigationItem title="Substreams" icon={<Substreams alt="" />}>
                  <NavigationItem title="Quick Start" />
                  <NavigationItem title="Find Existing Substreams" />
                  <NavigationItem title="Consuming Substreams" />
                </NavigationItem>
              </NavigationGroup>
              <NavigationGroup>
                <NavigationItem title="Substreams-Powered Subgraphs" icon={<SubstreamsPoweredSubgraph alt="" />}>
                  <NavigationItem title="Quick Start" />
                  <NavigationItem title="Find Existing Substreams-Powered Subgraphs" />
                  <NavigationItem title="Consuming Substreams-Powered Subgraphs" />
                </NavigationItem>
              </NavigationGroup>
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
                        href={item.route}
                        selected={item.route === activeRoute}
                        children={'children' in item ? item.children.map(renderItem) : undefined}
                      />
                    )
                  })(groupItem),
                )
                return (
                  <NavigationGroup key={groupIndex}>
                    {groupContent.length === 1 ? (
                      groupContent
                    ) : (
                      <NavigationItem title={group.title} href={group.route ?? group.items[0]!.route}>
                        {groupContent}
                      </NavigationItem>
                    )}
                  </NavigationGroup>
                )
              })}
            </nav>
          </div>
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </div>
      </DocumentContext.Provider>
    </NavContext.Provider>
  )
}
