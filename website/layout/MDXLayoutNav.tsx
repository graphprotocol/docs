import { keyframes } from '@emotion/react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useRouter } from 'next/router'
import { Fragment, PropsWithChildren, useContext, useEffect, useState } from 'react'

import { BorderRadius, buildTransition, Flex, Icon, NestedStrings, Spacing, Text } from '@edgeandnode/components'

import { DocSearch, Link, NavTree } from '@/components'
import { useI18n } from '@/i18n'
import { NavContext } from '@/layout'

const removeBasePathFromUrl = (url: string) => url.substring((process.env.BASE_PATH ?? '').length)

const animationExpand = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-collapsible-content-height)' },
})

const animationCollapse = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: 0 },
})

const DesktopWrapper = ({ children }: PropsWithChildren<{}>) => {
  const [enableTransition, setEnableTransition] = useState(false)

  // Fix issue where the `translateY` is animated on initial load
  useEffect(() => {
    setTimeout(() => setEnableTransition(true), 0)
  }, [])

  return (
    <div
      sx={{
        zIndex: 1,
        position: 'sticky',
        top: 0,
        maxHeight: '100vh',
        paddingInlineEnd: Spacing['24px'],
        pt: Spacing['32px'],
        pb: Spacing['16px'],
        overflowY: 'auto',
        transform: 'translateY(calc(var(--gds-header-height-visible) * var(--gds-header-fixed)))',
        transition: enableTransition ? buildTransition('TRANSFORM', '400ms') : undefined,
      }}
    >
      {children}
      <div
        sx={{
          height: 'var(--gds-header-height-visible)',
          transition: enableTransition ? buildTransition('height' as any, '400ms') : undefined,
        }}
      />
    </div>
  )
}

const MobileWrapper = ({ title, children }: PropsWithChildren<{ title?: string }>) => {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      sx={{
        borderRadius: BorderRadius.S,
        border: open ? 'White8' : 'White4',
        bg: open ? 'White8' : 'White4',
        '&:hover': {
          borderColor: 'White8',
          bg: 'White8',
        },
        transition: buildTransition('COLORS'),
      }}
    >
      <Collapsible.Trigger
        sx={{
          width: 'calc(100% + 2px)',
          m: '-1px',
          border: '1px solid transparent',
        }}
      >
        <Flex.Row
          as="span"
          justify="space-between"
          align="center"
          gap={Spacing['16px']}
          sx={{ px: Spacing['24px'], py: '20px' }}
        >
          <Flex.Column as="span" gap={Spacing['4px']}>
            <Text.C10 color="White64">Docs</Text.C10>
            <Text size="16px">{title}</Text>
          </Flex.Column>
          <Flex.Column
            as="span"
            sx={{
              flexShrink: 0,
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: buildTransition('TRANSFORM'),
            }}
          >
            <Icon.CaretRight title={open ? t('global.collapse') : t('global.expand')} />
          </Flex.Column>
        </Flex.Row>
      </Collapsible.Trigger>
      <Collapsible.Content
        sx={{
          borderTop: 'White8',
          overflow: 'hidden',
          animation: buildTransition((open ? animationExpand.toString() : animationCollapse.toString()) as any),
        }}
      >
        <div
          sx={{
            py: Spacing['16px'],
          }}
        >
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

const DocSearchHit = ({ hit, children }: PropsWithChildren<{ hit: { url: string } }>) => (
  <Link href={removeBasePathFromUrl(hit.url)}>{children}</Link>
)

export const MDXLayoutNav = ({ mobile = false }: { mobile?: boolean }) => {
  const router = useRouter()
  const { navItems, currentPage } = useContext(NavContext)!
  const { t, translations, locale } = useI18n()

  const Wrapper = mobile ? MobileWrapper : DesktopWrapper

  return (
    <Wrapper {...(mobile ? { title: currentPage?.title } : {})}>
      <div sx={{ mb: Spacing['16px'] }}>
        <DocSearch
          apiKey={process.env.ALGOLIA_API_KEY ?? ''}
          appId={process.env.ALGOLIA_APP_ID ?? ''}
          indexName="thegraph-docs"
          searchParameters={{
            facetFilters: [`language:${locale}`],
          }}
          disableUserPersonalization={true}
          transformItems={(items) => {
            return items.map((item) => ({
              ...item,
              url: item.url.replace('https://thegraph.com/docs', process.env.BASE_PATH ?? ''),
            }))
          }}
          hitComponent={DocSearchHit}
          navigator={{
            navigate({ itemUrl }) {
              void router.push(removeBasePathFromUrl(itemUrl))
            },
            navigateNewTab({ itemUrl }) {
              const windowReference = window.open(itemUrl, '_blank', 'noopener')
              if (windowReference) {
                windowReference.focus()
              }
            },
            navigateNewWindow({ itemUrl }) {
              window.open(itemUrl, '_blank', 'noopener')
            },
          }}
          translations={translations.docsearch as NestedStrings}
          placeholder={t('docsearch.button.buttonText')}
        />
      </div>
      <NavTree textProps={mobile ? { weight: 'REGULAR', size: '16px' } : undefined}>
        {navItems.map((navItem, navItemIndex) => (
          <Fragment key={navItemIndex}>
            {(() => {
              if ('divider' in navItem) {
                return <NavTree.Divider sx={mobile ? { mx: Spacing['24px'], my: Spacing['16px'] } : {}} />
              }
              if ('heading' in navItem) {
                return <NavTree.Heading>{navItem.heading}</NavTree.Heading>
              }
              if ('children' in navItem) {
                return (
                  <NavTree.Group active={currentPage?.path.startsWith(`${navItem.path}/`)}>
                    <NavTree.Group.Heading
                      sx={mobile ? { py: 0 } : {}}
                      buttonProps={{ sx: mobile ? {} : { paddingInlineEnd: 0 } }}
                    >
                      {navItem.title}
                    </NavTree.Group.Heading>
                    <NavTree.Group.Content>
                      {navItem.children.map((childNavItem, childNavItemIndex) => (
                        <NavTree.Item
                          key={childNavItemIndex}
                          href={childNavItem.path}
                          active={currentPage?.path === childNavItem.path}
                          sx={mobile ? { py: 0 } : {}}
                          linkProps={{ sx: mobile ? {} : { paddingInlineEnd: 0 } }}
                        >
                          {childNavItem.title}
                        </NavTree.Item>
                      ))}
                    </NavTree.Group.Content>
                  </NavTree.Group>
                )
              }
              return (
                <NavTree.Item
                  href={navItem.path}
                  active={currentPage?.path === navItem.path}
                  sx={mobile ? { py: 0 } : {}}
                  linkProps={{ sx: mobile ? {} : { paddingInlineEnd: 0 } }}
                  diamondProps={{ sx: mobile ? { left: '6px', insetInlineStart: '6px', insetInlineEnd: 'auto' } : {} }}
                >
                  {navItem.title}
                </NavTree.Item>
              )
            })()}
          </Fragment>
        ))}
      </NavTree>
    </Wrapper>
  )
}
