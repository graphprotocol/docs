import merge from 'lodash/merge'
import { motion } from 'motion/react'
import { NextSeo, type NextSeoProps } from 'next-seo'
import type { Heading as NextraHeading, NextraMDXContent, NextraThemeLayoutProps, ReadingTime } from 'nextra'
import { useFSRoute, useRouter } from 'nextra/hooks'
import { MDXProvider } from 'nextra/mdx'
import { normalizePages } from 'nextra/normalize-pages'
import {
  type ComponentPropsWithoutRef,
  createContext,
  type CSSProperties,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSet } from 'react-use'

import type { WithOptional } from '@edgeandnode/common'
import {
  ButtonOrLink,
  ExperimentalAppLauncher,
  ExperimentalButton,
  ExperimentalCodeInline,
  ExperimentalDivider,
  ExperimentalLink,
  ExperimentalLocaleSwitcher,
  ExperimentalNavLink,
  type NestedStrings,
  reactNodeToString,
  useIsomorphicLayoutEffect,
} from '@edgeandnode/gds'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Files,
  House,
  MagnifyingGlass,
  RoleIndexer,
  SidebarSimple,
  SocialDiscord,
  SocialGitHub,
  SocialTelegram,
  SocialX,
  Stack,
  Subgraph,
  Substreams,
  SubstreamsPoweredSubgraph,
  TheGraph,
  Translate,
} from '@edgeandnode/gds/icons'

import {
  CalendarIcon,
  Callout,
  CodeBlock,
  DocSearch,
  Heading,
  HourglassIcon,
  Image,
  NavigationGroup,
  NavigationItem,
  Table,
  VideoEmbed,
} from '@/components'
import { useI18n } from '@/i18n'

const MAX_HEADING_DEPTH = 3

const removeBasePathFromUrl = (url: string) => url.substring((process.env.BASE_PATH ?? '').length)

const DocSearchHit = ({ hit, children }: { hit: { url: string }; children?: ReactNode }) => (
  <ButtonOrLink href={removeBasePathFromUrl(hit.url)}>{children}</ButtonOrLink>
)

type FrontMatter = {
  title?: string
  description?: string
  socialImage?: string
  seo?: NextSeoProps
  remotePageUrl?: string
  hideTableOfContents?: boolean
  hideContentHeader?: boolean
  hideContentFooter?: boolean
  unwrapContent?: boolean
}

type LayoutContextProps = {
  filePath: string
  frontMatter: FrontMatter
  lastUpdated: Date | null
  readingTime: ReadingTime | null
  remotePageUrl: string | null
  // TODO: Replace the following by a more cleaned up `navigation` object
  flatDocsDirectories: ReturnType<typeof normalizePages>['flatDocsDirectories']
  activeIndex: ReturnType<typeof normalizePages>['activeIndex']
  activePath: ReturnType<typeof normalizePages>['activePath']
}

export const LayoutContext = createContext<LayoutContextProps | null>(null)

export default function Layout({ pageOpts, children }: NextraThemeLayoutProps<FrontMatter>) {
  const { filePath, frontMatter, pageMap, readingTime, timestamp } = pageOpts
  const fsPath = useFSRoute()
  const router = useRouter()
  const { t, translations, locale } = useI18n()
  const [sidebarExpandedOnMobile, setSidebarExpandedOnMobile] = useState(false)
  const [sidebarExpandedOnDesktop, setSidebarExpandedOnDesktop] = useState(true)

  // Collapse the sidebar on mobile when the route changes
  useEffect(() => {
    setSidebarExpandedOnMobile(false)
  }, [router.pathname])

  // TODO: Create `useTailwindScreen` hook in GDS, with usage like `const screen = useTailwindScreen()` and then you can check `screen.md`, etc.
  const [mobile, setMobile] = useState(false)
  useIsomorphicLayoutEffect(() => {
    const mediaQueryList = matchMedia('(min-width: 768px)')
    setMobile(!mediaQueryList.matches)
    const onChange = (event: MediaQueryListEvent) => setMobile(!event.matches)
    mediaQueryList.addEventListener('change', onChange)
    return () => mediaQueryList.removeEventListener('change', onChange)
  }, [])

  const normalizedPages = normalizePages({
    list: pageMap,
    route: fsPath,
  })

  type PartialNavigationItem = WithOptional<(typeof normalizedPages.directories)[number], 'children'>

  type NavigationItem = Omit<(typeof normalizedPages.directories)[number], 'children'> & {
    children: NavigationItem[]
    group: NavigationGroup
    ancestors: NavigationItem[]
    frontMatter?: FrontMatter
  }

  type NavigationGroup = {
    title: string | undefined
    route: string | undefined
    href: string | undefined
    items: NavigationItem[]
  }

  const getNavigationItemIcon = (item: NavigationItem) => {
    const routeWithoutLocale = getRouteWithoutLocale(item.route)
    const selected = getNavigationItemSelected(item.group.route ?? item.route)
    if (routeWithoutLocale === '') {
      return <House alt="" variant={selected ? 'fill' : 'regular'} />
    }
    if (routeWithoutLocale === '/about' || routeWithoutLocale.startsWith('/about/')) {
      return <TheGraph alt="" />
    }
    if (routeWithoutLocale === '/supported-networks' || routeWithoutLocale.startsWith('/supported-networks/')) {
      return <Stack alt="" variant={selected ? 'fill' : 'regular'} />
    }
    if (routeWithoutLocale === '/contracts' || routeWithoutLocale.startsWith('/contracts/')) {
      return <Files alt="" variant={selected ? 'fill' : 'regular'} />
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
      return <BookOpenText alt="" variant={selected ? 'fill' : 'regular'} />
    }
    return null
  }

  const getNavigationItemHref = (item: NavigationItem) => {
    let currentItem = item
    while (currentItem.children.length > 0 && !currentItem.withIndexPage) {
      currentItem = currentItem.children[0]!
    }
    return currentItem.route
  }

  const getRouteWithoutLocale = (route: string) => route.slice(3)
  const activeRoute = normalizedPages.activePath.at(-1)?.route ?? null
  let selectedItem: NavigationItem | null = null

  const getNavigationItemSelected = (route: string) => {
    if (route === activeRoute) {
      return true
    }
    if (
      selectedItem &&
      (route === selectedItem.group.route || selectedItem.ancestors.some((ancestor) => route === ancestor.route))
    ) {
      return 'partially'
    }
    return false
  }

  const navigationGroups = normalizedPages.directories.reduce<NavigationGroup[]>(
    (groups, partialItem: PartialNavigationItem) => {
      const itemHasChildren = Boolean(partialItem.children?.length)
      if (partialItem.type === 'children' && !itemHasChildren) return groups
      /**
       * When an item of type `children` doesn't have a title set in the meta file, we want to render it without a `NavigationItem` wrapper.
       * Unfortunately, Nextra defaults `title` to `name`, so the way to check if it's empty is to check if it's equal to `name`, which should
       * never happen with an explicitly set `title` because it should be title case whereas `name` will always be lowercase.
       */
      const itemHasNoWrapper = partialItem.type === 'children' && partialItem.title === partialItem.name
      let currentGroup = groups[groups.length - 1]
      /**
       * Create a new group if it's the first one, if the current item is a separator, or if the current group has some items but no title
       * (meaning its items are rendered at the top level instead of in an expandable panel) while the current item has children and a wrapper.
       */
      if (
        !currentGroup ||
        partialItem.type === 'separator' ||
        (currentGroup.title === undefined && currentGroup.items.length > 0 && itemHasChildren && !itemHasNoWrapper)
      ) {
        groups.push({
          title: partialItem.type === 'separator' ? partialItem.title : undefined,
          route: undefined,
          href: undefined,
          items: [],
        })
      }
      if (partialItem.type === 'separator') return groups
      currentGroup = groups[groups.length - 1]!
      const item = (function getItem(
        partialItem: PartialNavigationItem,
        ancestors: NavigationItem[] = [],
      ): NavigationItem {
        const item = {
          ...partialItem,
          children: [] as NavigationItem[],
          group: currentGroup,
          ancestors,
        }
        if (partialItem.children) {
          item.children = partialItem.children.map((child) => getItem(child, [...ancestors, item]))
        }
        if (item.route === activeRoute) {
          selectedItem = item
        }
        return item
      })(partialItem)
      if (currentGroup.title === undefined && currentGroup.items.length === 0 && itemHasChildren && !itemHasNoWrapper) {
        /**
         * If the group has no title and the first item we want to add to it has children and a wrapper, give the item's title, route,
         * href (if different from the first child's), and children to the group, instead of adding the item itself.
         */
        currentGroup.title = item.title
        currentGroup.route = item.route
        const href = getNavigationItemHref(item)
        const firstChildHref = getNavigationItemHref(item.children[0]!)
        currentGroup.href = href !== firstChildHref ? href : undefined
        currentGroup.items.push(...item.children)
      } else if (itemHasNoWrapper) {
        // Otherwise, if the first or next item to add to the group has no wrapper, just add its children to it
        currentGroup.items.push(...item.children)
      } else {
        // Otherwise, add the item (which may or may not have children) to the group
        currentGroup.items.push(item)
      }
      return groups
    },
    [],
  )

  const socialImage =
    frontMatter.socialImage ??
    (frontMatter.title
      ? // TODO: Use `vercel/og` instead
        `https://thegraph-docs-opengraph-image.the-guild.dev?title=${encodeURI(frontMatter.title)}`
      : null)
  let seo: NextSeoProps = {
    title: `${frontMatter.title ? `${frontMatter.title} | ` : ''}Docs | The Graph`,
    description: frontMatter.description,
    openGraph: {
      title: frontMatter.title,
      images: socialImage ? [{ url: socialImage }] : undefined,
    },
  }
  if (frontMatter.seo) {
    seo = merge(seo, frontMatter.seo)
  }

  return (
    <LayoutContext.Provider
      value={{
        filePath,
        frontMatter,
        // TODO: Why is `timestamp` undefined?
        lastUpdated: timestamp ? new Date(timestamp) : null,
        readingTime: readingTime && readingTime.minutes > 1 ? readingTime : null,
        remotePageUrl: frontMatter.remotePageUrl || null,
        flatDocsDirectories: normalizedPages.flatDocsDirectories,
        activeIndex: normalizedPages.activeIndex,
        activePath: normalizedPages.activePath,
      }}
    >
      <NextSeo {...seo} />

      <div
        className={`
          isolate ${/* Without this, the locale switcher's menu appears below the header */ ''}
          [--graph-docs-content-padding:theme(spacing.6)]
          [--graph-docs-footer-padding:theme(spacing.6)]
          [--graph-docs-header-height:theme(spacing.16)]
          [--graph-docs-header-padding:theme(spacing.3)]
          [--graph-docs-layout-transition-duration:300ms]
          [--graph-docs-sidebar-width:theme(spacing.72)]
          [--graph-docs-toc-width:theme(spacing.66)]
          md:[--graph-docs-content-padding:theme(spacing.16)]
          md:[--graph-docs-footer-padding:theme(spacing.8)]
          md:[--graph-docs-header-padding:theme(spacing.6)]
        `}
      >
        {/* TODO: Fix issue where the page scrolls up when elements in the header are tabbed to */}
        <header
          className={`
            sticky top-0 z-10 grid h-[var(--graph-docs-header-height)] grid-cols-[1fr_auto_1fr] items-center border-b border-space-1500 bg-space-1800
            md:grid-cols-[var(--graph-docs-sidebar-width)_auto]
          `}
        >
          <div className="contents md:flex md:items-center md:justify-center md:ps-[var(--graph-docs-header-padding)]">
            <ButtonOrLink
              href="/"
              className="text-body-large flex items-center text-space-300 outline-offset-4 transition hover:text-white md:-ms-1 md:me-auto"
            >
              <span className="absolute -inset-2" />
              <TheGraph color="white" className="prop-size-8 md:prop-size-7" />
              <span className="flex items-center max-md:hidden">
                <span className="me-4.5 ms-3.5 h-5 w-px shrink-0 bg-space-1300" />
                <span>Docs</span>
              </span>
            </ButtonOrLink>
            <div className="order-first px-[var(--graph-docs-header-padding)] md:order-none md:px-0">
              <ExperimentalButton
                data-sidebar-expanded-on-mobile={sidebarExpandedOnMobile || undefined}
                data-sidebar-expanded-on-desktop={sidebarExpandedOnDesktop || undefined}
                onClick={() => {
                  if (mobile) {
                    setSidebarExpandedOnMobile((expanded) => !expanded)
                  } else {
                    if (!sidebarExpandedOnDesktop) {
                      setSidebarExpandedOnDesktop(true)
                    } else {
                      setSidebarExpandedOnDesktop(false)
                      setSidebarExpandedOnMobile(false)
                    }
                  }
                }}
                className="prop-variant-tertiary md:prop-variant-naked md:nested-icon:prop-size-6"
              >
                <SidebarSimple
                  alt={t('global.navigation.show')}
                  variant="regular"
                  className={`
                    max-md:in-clickable-[[data-sidebar-expanded-on-mobile]]:hidden
                    md:in-clickable-[[data-sidebar-expanded-on-desktop]]:hidden
                  `}
                />
                <SidebarSimple
                  alt={t('global.navigation.hide')}
                  variant="fill"
                  className={`
                    max-md:in-clickable-not-[[data-sidebar-expanded-on-mobile]]:hidden
                    md:in-clickable-not-[[data-sidebar-expanded-on-desktop]]:hidden
                  `}
                />
              </ExperimentalButton>
            </div>
            <div className="ms-3.5 h-[var(--graph-docs-header-height)] w-px shrink-0 bg-space-1500 max-md:hidden" />
          </div>
          <div className="flex min-w-auto items-center gap-2 px-[var(--graph-docs-header-padding)]">
            {/* TODO: Add breadcrumbs */}
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
            >
              {({ buttonRef, openModal }) => (
                <div className="ms-auto xl:w-56">
                  <ExperimentalButton
                    ref={buttonRef}
                    variant="tertiary"
                    iconBefore={<MagnifyingGlass alt="" className="xl:hidden" />}
                    onClick={openModal}
                    className="peer w-full prop-hide-label-true md:prop-size-small md:prop-hide-label-false xl:prop-hide-label-true"
                  >
                    {t('docsearch.button.buttonText')}
                  </ExperimentalButton>
                  <div
                    className={`
                      absolute inset-0 flex items-center gap-1 px-2 text-12 text-space-500 transition pointer-events-none
                      peer-hover:text-space-200
                      max-xl:hidden
                    `}
                  >
                    <MagnifyingGlass size={3.5} alt="" />
                    <span aria-hidden="true" className="flex-1 truncate">
                      {t('docsearch.button.buttonText')}
                    </span>
                    <span>
                      <kbd>⌘</kbd> <kbd>K</kbd>
                    </span>
                  </div>
                </div>
              )}
            </DocSearch>
            <ExperimentalLocaleSwitcher>
              {({ localeDetails }) => (
                <ExperimentalButton
                  variant="tertiary"
                  iconBefore={<Translate alt={t('components.localeSwitcher.language')} />}
                  className="prop-hide-label-true md:prop-size-small md:prop-hide-label-false"
                >
                  <span className="xl:hidden">{localeDetails.shortName}</span>
                  <span className="max-xl:hidden">{localeDetails.displayName}</span>
                </ExperimentalButton>
              )}
            </ExperimentalLocaleSwitcher>
            <ExperimentalAppLauncher
              variant="tertiary"
              className="prop-hide-label-true md:prop-size-small md:prop-hide-label-false"
            />
          </div>
        </header>

        <div
          data-sidebar-expanded-on-mobile={sidebarExpandedOnMobile || undefined}
          data-sidebar-expanded-on-desktop={sidebarExpandedOnDesktop || undefined}
          className={`
            group/layout-sidebar-grid isolate grid grid-cols-[0_auto]
            transition-[grid-template-columns] duration-[var(--graph-docs-layout-transition-duration)]
            md:data-[sidebar-expanded-on-desktop]:grid-cols-[var(--graph-docs-sidebar-width)_auto]
          `}
        >
          <div
            onClick={() => setSidebarExpandedOnMobile(false)}
            className={`
              absolute inset-0 z-10 hidden bg-space-1800/50 opacity-0 transition-[opacity,display]
              duration-[var(--graph-docs-layout-transition-duration)] pointer-events-none transition-allow-discrete +:starting:opacity-0
              max-md:group-data-[sidebar-expanded-on-mobile]/layout-sidebar-grid:block
              max-md:group-data-[sidebar-expanded-on-mobile]/layout-sidebar-grid:opacity-100
              max-md:group-data-[sidebar-expanded-on-mobile]/layout-sidebar-grid:pointer-events-auto
            `}
          />
          <div className="sticky top-[var(--graph-docs-header-height)] z-10 h-[calc(100dvh-var(--graph-docs-header-height))]">
            <nav
              aria-label={t('global.navigation.title')}
              className={`
                invisible absolute inset-y-0 end-0 w-[var(--graph-docs-sidebar-width)] border-e border-space-1500 bg-space-1800
                transition-[transform,visibility] duration-[var(--graph-docs-layout-transition-duration)]
                max-md:group-data-[sidebar-expanded-on-mobile]/layout-sidebar-grid:visible
                max-md:group-data-[sidebar-expanded-on-mobile]/layout-sidebar-grid:translate-x-full
                md:group-data-[sidebar-expanded-on-desktop]/layout-sidebar-grid:visible
              `}
            >
              <div className="gradient-mask-y h-full overflow-y-auto overflow-x-clip scrollbar-thin">
                {/**
                 * TODOs about the navigation system:
                 * - Auto-expand the current item's ancestors on load and when the route changes
                 * - Remember which groups/items are expanded at every level, so that closing and re-expanding an ancestor doesn't affect its children's state
                 * - Remember if groups/items were manually expanded (with the caret) or auto-expanded (either by clicking on its title or by navigating to it
                 *   or one of its children), then auto-close those that were auto-expanded when the user navigates to a different group/item
                 */}
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
                          href={getNavigationItemHref(item)}
                          selected={getNavigationItemSelected(item.route)}
                          children={item.children.length > 0 ? <>{item.children.map(renderItem)}</> : undefined}
                        />
                      )
                    })(groupItem),
                  )
                  return (
                    <NavigationGroup key={groupIndex}>
                      {group.title !== undefined ? (
                        <NavigationItem
                          title={group.title}
                          icon={getNavigationItemIcon(group.items[0]!)}
                          href={group.href ?? getNavigationItemHref(group.items[0]!)}
                          selected={group.route ? getNavigationItemSelected(group.route) : undefined}
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
          </div>

          <div>
            <MDXProvider
              components={{
                // TODO: Get rid of the `as any`s
                a: ExperimentalLink as any,
                Link: ExperimentalLink,
                blockquote: Callout,
                code: ExperimentalCodeInline as any,
                h1: Heading.H1,
                h2: Heading.H2,
                h3: Heading.H3,
                h4: Heading.H4,
                h5: Heading.H5,
                h6: Heading.H6,
                img: Image,
                // TODO: Fix "[Shiki] X instances have been created. Shiki is supposed to be used as a singleton" warnings
                pre: CodeBlock,
                // TODO: Build and use `ExperimentalTable`
                table: Table,
                VideoEmbed,
                wrapper: MDXContent,
              }}
            >
              {children}
            </MDXProvider>

            <footer className="border-t border-space-1500 px-[var(--graph-docs-footer-padding)] py-8">
              <nav className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-4 md:py-2">
                  <ExperimentalNavLink href="https://thegraph.com/" target="_self" variant="secondary">
                    The Graph
                  </ExperimentalNavLink>
                  <ExperimentalNavLink href="https://status.thegraph.com/" target="_self" variant="secondary">
                    {t('components.globalFooter.status')}
                  </ExperimentalNavLink>
                  <ExperimentalNavLink href="https://testnet.thegraph.com/" target="_self" variant="secondary">
                    {t('components.globalFooter.testnet')}
                  </ExperimentalNavLink>
                  <ExperimentalNavLink href="https://thegraph.com/brand/" target="_self" variant="secondary">
                    {t('components.globalFooter.brandAssets')}
                  </ExperimentalNavLink>
                  <ExperimentalNavLink href="https://forum.thegraph.com/" target="_self" variant="secondary">
                    {t('components.globalFooter.forum')}
                  </ExperimentalNavLink>
                  <ExperimentalNavLink href="https://immunefi.com/bounty/thegraph/" target="_self" variant="secondary">
                    {t('components.globalFooter.security')}
                  </ExperimentalNavLink>
                  <ExperimentalNavLink href="https://thegraph.com/privacy/" target="_self" variant="secondary">
                    {t('components.globalFooter.privacyPolicy')}
                  </ExperimentalNavLink>
                  <ExperimentalNavLink href="https://thegraph.com/terms-of-service/" target="_self" variant="secondary">
                    {t('components.globalFooter.termsOfService')}
                  </ExperimentalNavLink>
                </div>
                <div className="flex items-center gap-2">
                  <ExperimentalButton
                    href="https://github.com/graphprotocol"
                    target="_self"
                    variant="tertiary"
                    size="small"
                    className="text-space-700"
                  >
                    <SocialGitHub />
                  </ExperimentalButton>
                  <ExperimentalButton href="https://x.com/graphprotocol" target="_self" variant="tertiary" size="small">
                    <SocialX />
                  </ExperimentalButton>
                  <ExperimentalButton
                    href="https://discord.gg/graphprotocol"
                    target="_self"
                    variant="tertiary"
                    size="small"
                  >
                    <SocialDiscord />
                  </ExperimentalButton>
                  <ExperimentalButton href="https://t.me/graphprotocol" target="_self" variant="tertiary" size="small">
                    <SocialTelegram />
                  </ExperimentalButton>
                </div>
              </nav>
            </footer>
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  )
}

type MDXContentContextProps = {
  headings: NextraHeading[]
  markHeading: (id: string, inOrAboveView: boolean) => void
  headingIsInOrAboveView: (id: string) => boolean
}

export const MDXContentContext = createContext<MDXContentContextProps | null>(null)

function MDXContent({ toc: headings, children }: ComponentPropsWithoutRef<NextraMDXContent>) {
  const {
    filePath,
    frontMatter,
    lastUpdated,
    readingTime,
    remotePageUrl,
    flatDocsDirectories,
    activeIndex,
    activePath,
  } = useContext(LayoutContext)!
  const { t, locale } = useI18n()

  const previousPage = flatDocsDirectories[activeIndex - 1] ?? null
  const nextPage = flatDocsDirectories[activeIndex + 1] ?? null

  const editPageUrl =
    remotePageUrl ??
    (() => {
      const [_src, _pages, locale, ...segments] = filePath.split('/')
      // If the current page is in a language other than English, link to the English version, as translations are handled by Crowdin
      return `https://github.com/graphprotocol/docs/blob/main/website/src/pages/${
        locale === 'en' || locale === '[locale]' ? encodeURIComponent(locale) : 'en'
      }/${segments.join('/')}`
    })()

  const [, { add: markHeadingAsInOrAboveView, remove: markHeadingAsNotInOrAboveView, has: headingIsInOrAboveView }] =
    useSet(new Set<string>([]))

  const markHeading = (id: string, inOrAboveView: boolean) => {
    if (inOrAboveView) {
      markHeadingAsInOrAboveView(id)
    } else {
      markHeadingAsNotInOrAboveView(id)
    }
  }

  let highlightedHeadingId = null
  for (const heading of headings) {
    if (heading.depth <= MAX_HEADING_DEPTH && headingIsInOrAboveView(heading.id)) {
      highlightedHeadingId = heading.id
    }
  }

  return (
    <MDXContentContext.Provider
      value={{
        headings,
        markHeading,
        headingIsInOrAboveView,
      }}
    >
      <main
        data-hide-table-of-contents={frontMatter.hideTableOfContents || undefined}
        className={`
          group/layout-toc-grid grid min-h-[calc(100svh-var(--graph-docs-header-height))] grid-cols-[auto_0] overflow-x-clip
          transition-[grid-template-columns] duration-[var(--graph-docs-layout-transition-duration)]
          xl:not-data-[hide-table-of-contents]:grid-cols-[auto_var(--graph-docs-toc-width)]
        `}
      >
        <article
          data-unwrap-content={frontMatter.unwrapContent || undefined}
          className={`
            group/layout-content-grid graph-docs-content grid
            grid-cols-[1fr_[container-start]_minmax(auto,theme(spacing.192))_[container-end]_1fr]
            content-start
            gap-x-[var(--graph-docs-content-padding)]
            transition-[gap] duration-[var(--graph-docs-layout-transition-duration)]
          `}
        >
          {/* TODO: Merge into the breadcrumbs? */}
          {activePath.length > 1 ? (
            <div className="graph-docs-current-group hidden">
              {activePath
                .slice(0, -1)
                .map((item) => item.title)
                .join(' > ')}
            </div>
          ) : null}
          {!frontMatter.hideContentHeader ? (
            <header className="col-[container] pt-12 transition-[padding] duration-[var(--graph-docs-layout-transition-duration)]">
              {readingTime ? (
                <span className="mb-3 flex items-center gap-1 text-space-700">
                  <HourglassIcon readingTime={Math.ceil(readingTime.minutes)} />
                  <p className="text-body-small">
                    {Math.ceil(readingTime.minutes)} {t('global.page.readingTime.minutes')}
                  </p>
                </span>
              ) : null}
              {frontMatter.title ? (
                <h1 className="text-heading-large text-white xs:text-heading-xlarge">{frontMatter.title}</h1>
              ) : null}
            </header>
          ) : null}
          <section
            className={`
              text-body-medium col-[container] pb-12 text-space-300
              mdx-[h2]:text-heading-medium
              mdx-[h3]:text-heading-small
              mdx-[h4,h5,h6]:text-heading-xsmall
              xs:mdx-[h2]:text-heading-large
              xs:mdx-[h3]:text-heading-medium
              xs:mdx-[h4]:text-heading-small
              group-data-[unwrap-content]/layout-content-grid:col-span-full
              group-data-[unwrap-content]/layout-content-grid:grid
              group-data-[unwrap-content]/layout-content-grid:grid-cols-subgrid
              -:first:*:mt-6
              -:group-data-[unwrap-content]/layout-content-grid:*:col-span-full
              nested-[div:has(>svg.flowchart):not(:last-child)]:mb-8
              nested-[div:has(>svg.flowchart)]:mt-8
              mdx-[hr]:my-12
              mdx-[:is(h2,h3)]:mt-12
              mdx-[:is(h2,h3,h4,h5,h6):not(:last-child)]:mb-3
              mdx-[:is(h4,h5,h6)]:mt-8
              mdx-[:is(p,ul,ol):not(:last-child,:is(ul,ol)_*)]:mb-6
              mdx-[:is(ul,ol)_:is(ul,ol,p+p)]:mt-2
              mdx-[ul,ol]:flex
              mdx-[hr]:h-px
              mdx-[ol]:list-decimal
              mdx-[ul,ol]:flex-col
              mdx-[ul,ol]:gap-2
              mdx-[hr]:bg-space-1500
              mdx-[li]:ps-1.5
              mdx-[ul,ol]:ps-5
              mdx-[b,strong]:text-white
              mdx-[h2,h3,h4,h5,h6]:text-white
              mdx-[b,strong]:font-medium
              mdx-[ul>li]:after:absolute
              mdx-[ul>li]:after:-start-4.5
              mdx-[ul>li]:after:top-4
              mdx-[ul>li]:after:h-0.5
              mdx-[ul>li]:after:w-3
              mdx-[ul>li]:after:bg-space-1100
              mdx-[ul>li]:after:content-['']
              md:pb-16
              md:mdx-[hr]:my-16
            `}
          >
            {children}
          </section>
          <div className="text-body-xsmall col-[container] flex items-center justify-between pb-12">
            {lastUpdated ? (
              <div className="text-body-xsmall flex items-center gap-1 text-space-700">
                <CalendarIcon date={lastUpdated.getDate()} />
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
              </div>
            ) : null}
            <ExperimentalLink
              href={editPageUrl}
              target="_blank"
              iconBefore={<SocialGitHub alt="" />}
              className="text-space-700"
            >
              {t('global.page.edit')}
            </ExperimentalLink>
          </div>
          {!frontMatter.hideContentFooter ? (
            <footer className="col-[container]">
              <ExperimentalDivider variant="subtle" />
              <div
                className={`
                  text-body-xsmall flex gap-8 py-12 text-space-300 lg:text-body-small
                  *:flex *:max-w-[min(theme(spacing.50),50%)] *:flex-col *:gap-2 *:outline-offset-8 *:transition hover:*:text-white
                  md:py-16
                `}
              >
                {previousPage ? (
                  <ButtonOrLink href={previousPage.route}>
                    <span className="absolute -inset-2" />
                    <ArrowLeft alt={t('global.page.previous')} size={4} />
                    <span className="line-clamp-2 text-ellipsis">{previousPage.title}</span>
                  </ButtonOrLink>
                ) : null}
                {nextPage ? (
                  <ButtonOrLink href={nextPage.route} className="ms-auto items-end text-end">
                    <span className="absolute -inset-2" />
                    <ArrowRight alt={t('global.page.next')} size={4} />
                    <span className="line-clamp-2 text-ellipsis">{nextPage.title}</span>
                  </ButtonOrLink>
                ) : null}
              </div>
            </footer>
          ) : null}
        </article>

        <div>
          <aside
            className={`
              text-body-xsmall-tight invisible absolute inset-y-0 start-0 w-[var(--graph-docs-toc-width)]
              transition-[visibility] duration-[var(--graph-docs-layout-transition-duration)]
              group-data-[hide-table-of-contents]/layout-toc-grid:hidden
              xl:group-not-data-[hide-table-of-contents]/layout-toc-grid:visible
            `}
          >
            <div
              className={`
                gradient-mask-y sticky top-[var(--graph-docs-header-height)] max-h-[calc(100dvh-var(--graph-docs-header-height))]
                overflow-y-auto overflow-x-clip py-12 pe-6 scrollbar-thin
              `}
            >
              <header className="mb-4">{t('global.page.onThisPage')}</header>
              {headings.length > 0 ? (
                <nav
                  aria-label={t('global.page.tableOfContents')}
                  className="flow-root overflow-y-clip border-s border-space-1500"
                >
                  <ul className="-my-1 -ms-px">
                    {headings.map((heading, headingIndex) => {
                      if (heading.depth > MAX_HEADING_DEPTH) {
                        return null
                      }
                      const active = heading.id === highlightedHeadingId
                      return (
                        <li key={headingIndex}>
                          {active ? (
                            <motion.span
                              className="absolute inset-y-1 start-0 w-px bg-purple"
                              // Using the page's `activeIndex` to ensure the indicator doesn't transition between pages
                              layoutId={`active-heading-indicator-${activeIndex}`}
                            />
                          ) : null}
                          <ButtonOrLink
                            href={`#${heading.id}`}
                            data-active={active ? 'true' : undefined}
                            className={`
                              block py-1.5 ps-[calc((var(--depth)-1)*theme(spacing.3))] text-space-700 transition
                              hover:text-white
                              data-[active]:text-space-200
                            `}
                            style={{ '--depth': heading.depth } as CSSProperties}
                          >
                            {/* Calling `reactNodeToString` because the types are lying and `heading.value` can be a `ReactNode` that contains links, inline code, etc. */}
                            {reactNodeToString(heading.value)}
                          </ButtonOrLink>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              ) : null}
            </div>
          </aside>
        </div>
      </main>
    </MDXContentContext.Provider>
  )
}
