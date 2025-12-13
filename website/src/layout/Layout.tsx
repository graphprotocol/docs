import { useMap } from '@react-hookz/web'
import merge from 'lodash/merge'
import NextImage from 'next/image'
import { NextSeo, type NextSeoProps } from 'next-seo'
import type { NextraThemeLayoutProps } from 'nextra'
import { useFSRoute, useRouter } from 'nextra/hooks'
import { MDXProvider } from 'nextra/mdx'
import { normalizePages } from 'nextra/normalize-pages'
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import type { WithOptional } from '@edgeandnode/common'
import {
  ButtonOrLink,
  classNames,
  ExperimentalAppLauncher,
  ExperimentalButton,
  ExperimentalCodeInline,
  ExperimentalLink,
  type ExperimentalLinkProps,
  ExperimentalLocaleSwitcher,
  ExperimentalNavLink,
  type NestedStrings,
  useIsomorphicLayoutEffect,
} from '@edgeandnode/gds'
import {
  APIToken,
  BookOpenText,
  Files,
  Horizon,
  House,
  Hypergraph,
  MagnifyingGlass,
  RoleIndexer,
  SidebarSimple,
  SocialDiscord,
  SocialGitHub,
  SocialTelegram,
  SocialX,
  Sparkle,
  Stack,
  Subgraph,
  Substreams,
  TheGraph,
  Translate,
} from '@edgeandnode/gds/icons'

import {
  Callout,
  CodeBlock,
  DocSearch,
  Heading,
  Image,
  NavigationGroup,
  NavigationItem,
  Table,
  VideoEmbed,
} from '@/components'
import { useI18n } from '@/i18n'

import { MDXContent } from './MDXContent'
import { type FrontMatter, LayoutContext, type TemplateOptions, templateOptionsSchema } from './shared'

const removeBasePathFromUrl = (url: string) => url.substring((process.env.BASE_PATH ?? '').length)

const DocSearchHit = ({ hit, children }: { hit: { url: string }; children?: ReactNode }) => (
  <ButtonOrLink href={removeBasePathFromUrl(hit.url)}>{children}</ButtonOrLink>
)

export default function Layout({ pageOpts, children }: NextraThemeLayoutProps<FrontMatter>) {
  const { filePath, frontMatter, pageMap, readingTime, timestamp } = pageOpts
  const fsPath = useFSRoute()
  const normalizedPages = normalizePages({
    list: pageMap,
    route: fsPath,
  })
  const activeRoute = normalizedPages.activePath.at(-1)?.route ?? null
  const router = useRouter()
  const { t, translations, locale } = useI18n()
  const [sidebarExpandedOnMobile, setSidebarExpandedOnMobile] = useState(false)
  const [sidebarExpandedOnDesktop, setSidebarExpandedOnDesktop] = useState(true)

  // Collapse the sidebar on mobile when the route changes
  useEffect(() => {
    setSidebarExpandedOnMobile(false)
  }, [activeRoute])

  // TODO: Create `useTailwindScreen` hook in GDS, with usage like `const screen = useTailwindScreen()` and then you can check `screen.md`, etc.
  const [mobile, setMobile] = useState(false)
  useIsomorphicLayoutEffect(() => {
    const mediaQueryList = matchMedia('(min-width: 768px)')
    setMobile(!mediaQueryList.matches)
    const onChange = (event: MediaQueryListEvent) => setMobile(!event.matches)
    mediaQueryList.addEventListener('change', onChange)
    return () => mediaQueryList.removeEventListener('change', onChange)
  }, [])

  type PartialNavItem = WithOptional<(typeof normalizedPages.directories)[number], 'children'>

  type NavItem = Omit<(typeof normalizedPages.directories)[number], 'children'> & {
    children: NavItem[]
    group: NavItemGroup
    ancestors: NavItem[]
    frontMatter?: FrontMatter
  }

  type NavItemGroup = {
    title: string | undefined
    route: string | undefined
    href: string | undefined
    items: NavItem[]
  }

  const selectedNavItemRef = useRef<NavItem | null>(null)
  const navItemExpandedByRoute = useMap<string, boolean | 'manually-expanded'>()

  // Refresh the expansion state of nav items on load and when the route changes
  useEffect(() => {
    // Only keep the manually expanded items
    for (const [route, expanded] of navItemExpandedByRoute.entries()) {
      if (expanded !== 'manually-expanded') {
        navItemExpandedByRoute.delete(route)
      }
    }
    // Expand the selected item's ancestors and group that are not already expanded (as to not override the manually expanded states)
    if (selectedNavItemRef.current) {
      const routesToExpand = [
        selectedNavItemRef.current.route,
        ...selectedNavItemRef.current.ancestors.map((ancestor) => ancestor.route),
        selectedNavItemRef.current.group.route,
      ]
      for (const route of routesToExpand) {
        if (route === undefined) continue
        const alreadyExpanded = navItemExpandedByRoute.get(route)
        if (alreadyExpanded) continue
        navItemExpandedByRoute.set(route, true)
      }
    }
  }, [activeRoute, navItemExpandedByRoute])

  const { navItemGroups, getNavItemSelected, getNavItemExpanded, setNavItemExpanded, getNavItemIcon, getNavItemHref } =
    useMemo(() => {
      const getRouteWithoutLocale = (route: string) => route.slice(3)

      const getNavItemSelected = (route: string) => {
        if (route === activeRoute) {
          return true
        }
        const parentRouteKey = frontMatter.parentRouteKey
        if (parentRouteKey && getRouteWithoutLocale(route) === `/${parentRouteKey}`) {
          return true
        }
        if (
          selectedNavItemRef.current &&
          selectedNavItemRef.current.ancestors.some((ancestor) => ancestor.route === route)
        ) {
          return 'partially'
        }
        return false
      }

      const getNavItemExpanded = (route: string) => Boolean(navItemExpandedByRoute.get(route))

      const setNavItemExpanded = (route: string, expanded: boolean, manual?: boolean) => {
        navItemExpandedByRoute.set(route, expanded ? (manual ? 'manually-expanded' : true) : false)
      }

      const getNavItemIcon = (navItem: NavItem) => {
        const routeWithoutLocale = getRouteWithoutLocale(navItem.route)
        const selected = getNavItemSelected(navItem.group.route ?? navItem.route)
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
        if (routeWithoutLocale === '/token-api' || routeWithoutLocale.startsWith('/token-api/')) {
          return <APIToken alt="" />
        }
        if (routeWithoutLocale === '/hypergraph' || routeWithoutLocale.startsWith('/hypergraph/')) {
          return <Hypergraph alt="" />
        }
        if (routeWithoutLocale === '/ai-suite' || routeWithoutLocale.startsWith('/ai-suite/')) {
          return <Sparkle alt="" variant={selected ? 'fill' : 'regular'} />
        }
        if (routeWithoutLocale === '/indexing' || routeWithoutLocale.startsWith('/indexing/')) {
          return <RoleIndexer alt="" />
        }
        if (routeWithoutLocale === '/graph-horizon' || routeWithoutLocale.startsWith('/graph-horizon/')) {
          return <Horizon alt="" />
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

      const getNavItemHref = (navItem: NavItem) => {
        let currentNavItem = navItem
        while (currentNavItem.children.length > 0 && !currentNavItem.withIndexPage) {
          currentNavItem = currentNavItem.children[0]!
        }
        return currentNavItem.route
      }

      const navItemGroups = normalizedPages.directories.reduce<NavItemGroup[]>(
        (groups, partialNavItem: PartialNavItem) => {
          const navItemHasChildren = Boolean(partialNavItem.children?.length)
          if (partialNavItem.type === 'children' && !navItemHasChildren) return groups

          /**
           * When an item of type `children` doesn't have a title set in the meta file, we want to render it without a `NavigationItem` wrapper.
           * Unfortunately, Nextra defaults `title` to `name`, so the way to check if it's empty is to check if it's equal to `name`, which should
           * never happen with an explicitly set `title` because it should be title case whereas `name` will always be lowercase.
           */
          const navItemHasNoWrapper = partialNavItem.type === 'children' && partialNavItem.title === partialNavItem.name
          let currentGroup = groups[groups.length - 1]

          /**
           * Create a new group if it's the first one, if the current item is a separator, or if the current group has some items but no title
           * (meaning its items are rendered at the top level instead of in an expandable panel) while the current item has children and a wrapper.
           */
          if (
            !currentGroup ||
            partialNavItem.type === 'separator' ||
            (currentGroup.title === undefined &&
              currentGroup.items.length > 0 &&
              navItemHasChildren &&
              !navItemHasNoWrapper)
          ) {
            groups.push({
              title: partialNavItem.type === 'separator' ? partialNavItem.title : undefined,
              route: undefined,
              href: undefined,
              items: [],
            })
          }

          if (partialNavItem.type === 'separator') return groups
          currentGroup = groups[groups.length - 1]!

          const getNavItem = (partialNavItem: PartialNavItem, ancestors: NavItem[] = []) => {
            const navItem: NavItem = {
              ...partialNavItem,
              children: [] as NavItem[],
              group: currentGroup,
              ancestors,
            }
            if (partialNavItem.children) {
              navItem.children = partialNavItem.children.map((child) => getNavItem(child, [...ancestors, navItem]))
            }
            if (navItem.route === activeRoute) {
              selectedNavItemRef.current = navItem
            }
            return navItem
          }
          const navItem = getNavItem(partialNavItem)

          /**
           * If the group has no title and the first item we want to add to it has children and a wrapper, give the item's title, route,
           * href (if different from the first child's), and children to the group, instead of adding the item itself.
           */
          if (
            currentGroup.title === undefined &&
            currentGroup.items.length === 0 &&
            navItemHasChildren &&
            !navItemHasNoWrapper
          ) {
            currentGroup.title = navItem.title
            currentGroup.route = navItem.route
            const href = getNavItemHref(navItem)
            currentGroup.href = href !== getNavItemHref(navItem.children[0]!) ? href : undefined
            currentGroup.items.push(...navItem.children)
          } else if (navItemHasNoWrapper) {
            // Otherwise, if the first or next item to add to the group has no wrapper, just add its children to it
            currentGroup.items.push(...navItem.children)
          } else {
            // Otherwise, add the item (which may or may not have children) to the group
            currentGroup.items.push(navItem)
          }
          return groups
        },
        [],
      )

      return {
        navItemGroups,
        getNavItemSelected,
        getNavItemExpanded,
        setNavItemExpanded,
        getNavItemIcon,
        getNavItemHref,
      }
    }, [normalizedPages.directories, activeRoute, frontMatter.parentRouteKey, navItemExpandedByRoute])

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

  const template: TemplateOptions = templateOptionsSchema.parse({
    type: 'default',
    ...(typeof frontMatter.template === 'object' ? frontMatter.template : {}),
  })

  return (
    <LayoutContext.Provider
      value={{
        filePath,
        frontMatter,
        template,
        // TODO: Why is `timestamp` undefined?
        lastUpdated: timestamp ? new Date(timestamp) : null,
        readingTime: readingTime && readingTime.minutes > 1 ? readingTime : null,
        remotePageUrl: frontMatter.remotePageUrl || null,
        // TODO: Replace the following by a more cleaned up `navigation` object
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
          [--graph-docs-viewport-height:calc(100dvh-var(--graph-docs-header-height))]
          md:[--graph-docs-content-padding:theme(spacing.16)]
          md:[--graph-docs-footer-padding:theme(spacing.8)]
          md:[--graph-docs-header-padding:theme(spacing.6)]
        `}
      >
        {/* TODO: Fix issue where the page scrolls up when elements in the header are tabbed to */}
        <header
          className={`
            sticky top-0 z-10 grid h-[var(--graph-docs-header-height)] grid-cols-[auto_auto_1fr] items-center border-b border-space-1500 bg-space-1800
            md:grid-cols-[var(--graph-docs-sidebar-width)_auto]
          `}
        >
          <div className="contents md:flex md:items-center md:justify-center md:ps-[var(--graph-docs-header-padding)]">
            <div className="flex items-center max-md:ml-2 md:me-auto">
              <ButtonOrLink href="https://thegraph.com/">
                <TheGraph size={7} color="white" />
              </ButtonOrLink>
              <span className="me-4.5 ms-3.5 h-5 w-px shrink-0 bg-space-1300" />
              <ButtonOrLink
                href="/"
                className="text-body-large text-space-300 outline-offset-4 transition hover:text-white"
              >
                Docs
              </ButtonOrLink>
            </div>
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
            transition-[grid-template-columns]
            duration-[var(--graph-docs-layout-transition-duration)]
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
          <div className="sticky top-[var(--graph-docs-header-height)] z-10 h-[var(--graph-docs-viewport-height)]">
            <nav
              aria-label={t('global.navigation.title')}
              className={`
                invisible absolute inset-y-0 end-0 w-[var(--graph-docs-sidebar-width)] border-e border-space-1500 bg-space-1800
                transition-[transform,visibility]
                duration-[var(--graph-docs-layout-transition-duration)]
                max-md:group-data-[sidebar-expanded-on-mobile]/layout-sidebar-grid:visible
                max-md:group-data-[sidebar-expanded-on-mobile]/layout-sidebar-grid:translate-x-full
                md:group-data-[sidebar-expanded-on-desktop]/layout-sidebar-grid:visible
              `}
            >
              <div className="gradient-mask-y h-full overflow-y-auto overflow-x-clip scrollbar-thin">
                {navItemGroups.map((group, groupIndex) => {
                  if (group.items.length === 0) {
                    return null
                  }
                  const groupContent = group.items.map((groupItem) =>
                    (function renderNavItem(navItem) {
                      return (
                        <NavigationItem
                          key={navItem.name}
                          title={navItem.title}
                          icon={getNavItemIcon(navItem)}
                          href={getNavItemHref(navItem)}
                          selected={getNavItemSelected(navItem.route)}
                          expanded={getNavItemExpanded(navItem.route)}
                          onExpandedChange={(expanded, manual) => setNavItemExpanded(navItem.route, expanded, manual)}
                          children={
                            navItem.children.length > 0 ? <>{navItem.children.map(renderNavItem)}</> : undefined
                          }
                        />
                      )
                    })(groupItem),
                  )
                  return (
                    <NavigationGroup key={groupIndex}>
                      {group.title !== undefined ? (
                        <NavigationItem
                          title={group.title}
                          icon={getNavItemIcon(group.items[0]!)}
                          href={group.href ?? getNavItemHref(group.items[0]!)}
                          selected={group.route ? getNavItemSelected(group.route) : undefined}
                          expanded={group.route ? getNavItemExpanded(group.route) : undefined}
                          onExpandedChange={
                            group.route
                              ? (expanded, manual) => setNavItemExpanded(group.route!, expanded, manual)
                              : undefined
                          }
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
                a: LinkWrapper,
                blockquote: Callout,
                // TODO: Get rid of the `as any`
                code: ExperimentalCodeInline as any,
                h1: Heading.H1,
                h2: Heading.H2,
                h3: Heading.H3,
                h4: Heading.H4,
                h5: Heading.H5,
                h6: Heading.H6,
                img: ImageWrapper,
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

const LinkContext = createContext<{} | null>(null)

function LinkWrapper({ children, ...props }: ComponentProps<'a'>) {
  if ('data-wrapping-image' in props) {
    return (
      <LinkContext.Provider value={{}}>
        <a {...props}>{children}</a>
      </LinkContext.Provider>
    )
  }
  return <ExperimentalLink {...(props as ExperimentalLinkProps.ExternalLinkProps)}>{children}</ExperimentalLink>
}

interface ImageWrapperProps extends Omit<ComponentProps<'img'>, 'src'> {
  src?: ComponentProps<typeof NextImage>['src']
  placeholder?: ComponentProps<typeof NextImage>['placeholder']
}

function ImageWrapper({ src: passedSrc, placeholder: _placeholder, className, ...props }: ImageWrapperProps) {
  const linkContext = useContext(LinkContext)
  const src =
    typeof passedSrc === 'object' ? ('default' in passedSrc ? passedSrc.default.src : passedSrc.src) : passedSrc

  if (linkContext || 'data-inline-image' in props) {
    return <img src={src} alt="" className={classNames(['inline-block', className])} {...props} />
  }

  return <Image src={src} className={className} {...props} />
}
