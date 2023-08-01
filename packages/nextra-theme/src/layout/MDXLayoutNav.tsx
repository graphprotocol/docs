import { DocSearchHit } from '@docsearch/react/dist/esm/types'
import { keyframes } from '@emotion/react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useRouter } from 'next/router'
import { Item } from 'nextra/normalize-pages'
import { Fragment, PropsWithChildren, useContext, useEffect, useState } from 'react'

import {
  BorderRadius,
  buildTransition,
  ButtonOrLink,
  Flex,
  Icon,
  NestedStrings,
  Spacing,
  Text,
  useI18n,
} from '@edgeandnode/gds'

import { DocSearch, NavTree } from '@/components'
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
    setTimeout(() => setEnableTransition(true), 20)
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
          transition: enableTransition ? buildTransition('height', '400ms') : undefined,
        }}
      />
    </div>
  )
}

const MobileWrapper = ({ title, children }: PropsWithChildren<{ title?: string }>) => {
  const [open, setOpen] = useState(false)
  const { t } = useI18n<any>()

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
          animation: buildTransition(open ? animationExpand.toString() : animationCollapse.toString()),
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
  <ButtonOrLink href={removeBasePathFromUrl(hit.url)}>{children}</ButtonOrLink>
)

export const MDXLayoutNav = ({ mobile = false }: { mobile?: boolean }) => {
  const router = useRouter()
  const { activePath, directories } = useContext(NavContext)!
  const { t, translations, locale } = useI18n<any>()

  const Wrapper = mobile ? MobileWrapper : DesktopWrapper

  const activePage = activePath.at(-1) || { route: '', title: '' }

  return (
    <Wrapper {...(mobile ? { title: activePage.title } : {})}>
      <div sx={{ mb: Spacing['16px'] }}>
        <DocSearch
          apiKey={process.env.ALGOLIA_API_KEY ?? ''}
          appId={process.env.ALGOLIA_APP_ID ?? ''}
          indexName="thegraph-docs"
          searchParameters={{
            facetFilters: [`language:${locale}`],
          }}
          disableUserPersonalization={true}
          transformItems={(items: DocSearchHit[]) =>
            items.map((item) => ({
              ...item,
              url: item.url.replace('https://thegraph.com/docs', process.env.BASE_PATH ?? ''),
            }))
          }
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
        {directories.map((pageItem) =>
          (function renderSidebar(pageItem: Item) {
            if (pageItem.type === 'separator') {
              return (
                <NavTree.Divider key={pageItem.name} sx={mobile ? { mx: Spacing['24px'], my: Spacing['16px'] } : {}} />
              )
            }
            if (pageItem.type === 'heading') {
              return <NavTree.Heading key={pageItem.name}>{pageItem.title}</NavTree.Heading>
            }
            if ('children' in pageItem && pageItem.children) {
              if (pageItem.type === 'children') {
                return <Fragment key={pageItem.name}>{pageItem.children.map(renderSidebar)}</Fragment>
              }

              return (
                <NavTree.Group key={pageItem.name} active={activePage.route.startsWith(`${pageItem.route}/`)}>
                  <NavTree.Group.Heading
                    sx={mobile ? { py: 0 } : {}}
                    buttonProps={{ sx: mobile ? {} : { paddingInlineEnd: 0 } }}
                  >
                    {pageItem.title}
                  </NavTree.Group.Heading>
                  <NavTree.Group.Content>{pageItem.children.map(renderSidebar)}</NavTree.Group.Content>
                </NavTree.Group>
              )
            }
            return (
              <NavTree.Item
                key={pageItem.name}
                href={pageItem.route}
                active={activePage.route === pageItem.route}
                sx={mobile ? { py: 0 } : {}}
                linkProps={{ sx: mobile ? {} : { paddingInlineEnd: 0 } }}
                diamondProps={{
                  sx: mobile
                    ? {
                        left: '6px',
                        insetInlineStart: '6px',
                        insetInlineEnd: 'auto',
                      }
                    : {},
                }}
              >
                {pageItem.title}
              </NavTree.Item>
            )
          })(pageItem),
        )}
      </NavTree>
    </Wrapper>
  )
}
