import * as Collapsible from '@radix-ui/react-collapsible'
import type { Item } from 'nextra/normalize-pages'
import { Fragment, type PropsWithChildren, useContext, useState } from 'react'

import { BorderRadius, buildTransition, Flex, Icon, Spacing, Text, useI18n } from '@edgeandnode/gds'

import { NavTree } from '@/components'

import { NavContext } from './NavContext'

const DesktopWrapper = ({ children }: PropsWithChildren<{}>) => {
  return <div>{children}</div>
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
        <Flex.Row as="span" justify="space-between" align="center" gap={Spacing['16px']}>
          <Flex.Column as="span" gap={Spacing['4px']}>
            <Text.C10 color="White64">Docs</Text.C10>
            <Text size="16px">{title}</Text>
          </Flex.Column>
          <Flex.Column
            as="span"
            sx={{
              flexShrink: 0,
              transition: buildTransition('TRANSFORM'),
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              '&:dir(rtl)': {
                transform: open ? 'rotate(-90deg)' : 'rotate(0deg)',
              },
            }}
          >
            <Icon.CaretRight title={open ? t('global.collapse') : t('global.expand')} />
          </Flex.Column>
        </Flex.Row>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div>{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export const MDXLayoutNav = ({ mobile = false }: { mobile?: boolean }) => {
  const { activePath, directories } = useContext(NavContext)!
  const Wrapper = mobile ? MobileWrapper : DesktopWrapper
  const activePage = activePath.at(-1) || { route: '', title: '' }

  return (
    <Wrapper {...(mobile ? { title: activePage.title } : {})}>
      <NavTree textProps={mobile ? { weight: 'REGULAR', size: '16px' } : undefined}>
        {directories.map((pageItem) =>
          (function renderSidebar(pageItem: Item) {
            if (pageItem.type === 'separator') {
              return (
                <Fragment key={pageItem.name}>
                  <NavTree.Divider />
                  {pageItem.title ? <NavTree.Heading>{pageItem.title}</NavTree.Heading> : null}
                </Fragment>
              )
            }
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if ('children' in pageItem && pageItem.children) {
              if (pageItem.children.length === 0) {
                return null
              }

              if (pageItem.type === 'children') {
                return <Fragment key={pageItem.name}>{pageItem.children.map(renderSidebar)}</Fragment>
              }
              return (
                <NavTree.Group key={pageItem.name} active={activePage.route.startsWith(`${pageItem.route}/`)}>
                  <NavTree.Group.Heading>{pageItem.title}</NavTree.Group.Heading>
                  <NavTree.Group.Content>{pageItem.children.map(renderSidebar)}</NavTree.Group.Content>
                </NavTree.Group>
              )
            }
            return (
              <NavTree.Item key={pageItem.name} href={pageItem.route} active={activePage.route === pageItem.route}>
                {pageItem.title}
              </NavTree.Item>
            )
          })(pageItem),
        )}
      </NavTree>
    </Wrapper>
  )
}
